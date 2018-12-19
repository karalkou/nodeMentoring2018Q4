import path from 'path';
import { EventEmitter } from 'events';
import { readdir, stat, access } from 'fs';
import { promisify } from 'util';
import { defaultEncoding } from './../config/index.json';

const readDirPromisified = promisify(readdir);
const statPromisified = promisify(stat);
const accessPromisified = promisify(access);

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
     *
     * @param path
     * @param delay
     */
    async watch(path, delay) {
        //console.log('* watch was inited');
        this.path = path;
        this.delay = delay;

        // await this.startCheck();
        this.experiments();
    }

    /**
     *
     * @returns {Promise<void>}
     */
    async startCheck() {
        //console.log('* startCheck was inited');
        try {
            //console.log('* startCheck try');
            await this.checkForChanges();
            this.pollTimer = setTimeout(this.startCheck, this.delay);
        } catch (err) {
            //console.log('* startCheck catch');
            console.error(err.message);
            this.destroy();
        }
    }

    /**
     *
     * @returns {Promise<void>}
     */
    async checkForChanges() {
        //console.log('* checkForChanges was inited');

        const fileNames = await readDirPromisified(this.path, { encoding: defaultEncoding });
        //console.log('-- fileNames: \n', fileNames);
        const removedFiles = this.files.filter(file => !fileNames.includes(file.name));
        // console.log('-- removedFiles: \n', removedFiles);

        removedFiles.forEach(file => this.emit("dirwatcher:changed", { type: "deleted", file: file }));

        this.files = await Promise.all(fileNames.map(this.handleFileStatus));
        // console.log('-- this.files: \n', this.files);

    }

    /**
     *
     */
    destroy() {
        //console.log('* destroy was inited');
        clearTimeout(this.pollTimer);
    }

    /**
     *
     * @param fileName
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

            this.emit("dirwatcher:changed", { type: "added", file: newFile });

            return newFile;
        }

        if (file.lastModified < stat.mtimeMs) {
            this.emit("dirwatcher:changed", { type: "modified", file: file });

            file.lastModified = stat.mtimeMs;
        }

        return file;
    }

    async experiments() {
        console.log('-- experiments');
        const fileNames = await readDirPromisified(this.path, { encoding: defaultEncoding });
        console.log('-- fileNames: \n', fileNames);

        // const stats = await statPromisified(`${this.path}sample.csv`);
        // console.log('-- stats: ', stats);

        const isExist = await accessPromisified(
            `${this.path}sample.csv`,
            (err) => {
                if (!err) {
                    console.log('file exists promisified');
                    return true;
                } else {
                    console.log('err: ', err);
                    return false;
                }
            }
        );

        /*const isExistOld = access(
            `${this.path}SampleCSVFile_2kb.csv`,
            (err) => {
                if (!err) {
                    console.log('file exists old');
                    return true;
                } else {
                    console.log('err: ', err);
                    return false;
                }
            }
        );*/
        console.log(`${this.path}sample.csv`);
        console.log('is sample.csv exist: ', isExist);
        // console.log('is sample.csv exist: ', isExistOld);
        console.log(this.isFileExist(`${this.path}sample.csv`));
    }

    /**
     *
     * @param path
     * @returns {string}
     */
    isFileExist(path) {
        let result = '';
        access(path, err => {
            result = !err
        });
        return result;
    }
}
