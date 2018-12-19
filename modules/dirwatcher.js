import path from 'path';
import { EventEmitter } from 'events';
import { readdir, stat } from 'fs';
import { promisify } from 'util';

import { defaultEncoding } from './../config/index.json';
import { DIR_WATCHER_CHANGED, EVENT_TYPE_ADDED, EVENT_TYPE_DELETED, EVENT_TYPE_MODIFIED } from "../config/constants";

const readDirPromisified = promisify(readdir);
const statPromisified = promisify(stat);

export default class DirWatcher extends EventEmitter {
    constructor() {
        super();
        this.path = null;
        this.delay = 0;
        this.files = [];
        this.pollTimer = null;
        this.startCheck = this.startCheck.bind(this);
        this.handleFileStatus = this.handleFileStatus.bind(this);
    }

    /**
     * Watches given path with given delay
     * @param path {string} - path to file
     * @param delay {number} - delay to make check
     */
    async watch(path, delay) {
        this.path = path;
        this.delay = delay;

        await this.startCheck();
    }

    /**
     * Calls this.checkForChanges recursively with given delay or remove timer
     * @returns {Promise<void>}
     */
    async startCheck() {
        try {
            await this.checkForChanges();
            this.pollTimer = setTimeout(this.startCheck, this.delay);
        } catch (err) {
            console.error(err.message);
            this.destroy();
        }
    }

    /**
     * Checks for changes
     * @returns {Promise<void>}
     */
    async checkForChanges() {
        const fileNames = await readDirPromisified(this.path, { encoding: defaultEncoding });
        const removedFiles = this.files.filter(file => !fileNames.includes(file.name));

        removedFiles.forEach(file => this.emit(DIR_WATCHER_CHANGED, { type: EVENT_TYPE_DELETED, file: file }));

        this.files = await Promise.all(fileNames.map(this.handleFileStatus));
    }

    /**
     * Clears timeout
     */
    destroy() {
        clearTimeout(this.pollTimer);
    }

    /**
     * Handles file status and emits events dirwatcher:changed with types added/modified
     * @param fileName - file name
     * @returns {Promise<*>}
     */
    async handleFileStatus(fileName) {
        const file = this.files.find(file => file.name === fileName);
        let stat = {};

        try {
            stat = await statPromisified(path.join(this.path, fileName));
        } catch (err) {
            console.error(err);
            return file;
        }

        if (!file) {
            const newFile = {
                name: fileName,
                lastModified: stat.mtimeMs,
                path: path.join(this.path, fileName),
            };

            this.emit(DIR_WATCHER_CHANGED, { type: EVENT_TYPE_ADDED, file: newFile });

            return newFile;
        }

        if (file.lastModified < stat.mtimeMs) {
            this.emit(DIR_WATCHER_CHANGED, { type: EVENT_TYPE_MODIFIED, file: file });

            file.lastModified = stat.mtimeMs;
        }

        return file;
    }
}
