import path from 'path';
import { EventEmitter } from 'events';
import { readdir, stat, access } from 'fs';
import { promisify } from 'util';

const readDirPromisified = promisify(readdir);
const statPromisified = promisify(stat);
// const accessPromisified = promisify(access);

export default class DirWatcher extends EventEmitter {
    constructor() {
        super();
        this.path = null;
        this.delay = 0;
        this.files = [];
        this.checkForChanges = this.checkForChanges.bind(this);
        this.handleFileStatus = this.handleFileStatus.bind(this);
    }

    /**
     *
     * @param path
     * @param delay
     */
    watch(path, delay) {
        console.log('* watch was inited');
        this.path = path;
        this.delay = delay;
        setTimeout(this.checkForChanges, this.delay);
    }

    /**
     *
     * @returns {Promise<void>}
     */
    async checkForChanges() {
        console.log('* checkForChanges was inited');

        const fileNames = await readDirPromisified(this.path);
        console.log('-- fileNames: \n', fileNames);
        const removedFiles = this.files.filter(
            file => !fileNames.includes(file.name)
        );
        console.log('-- removedFiles: \n', removedFiles);

        removedFiles.forEach(file => this.emit("dirwatcher:changed", { type: "deleted", file: file }));

        this.files = await Promise.all(fileNames.map(this.handleFileStatus));
        console.log('-- this.files: \n', this.files);


        // const stats = await statPromisified(`${this.path}SampleCSVFile_2kb.csv`);
        // console.log('stats: ', stats);

        /*const isExist = await accessPromisified(
            `${this.path}SampleCSVFile_2kb.csv`,
            (err) => {
                if(!err) {
                    console.log('file exists promisified');
                    return true;
                } else {
                    console.log('err: ', err);
                    return false;
                }
            }
        );*/

        /*const isExistOld = access(
            `${this.path}SampleCSVFile_2kb.csv`,
            (err) => {
                if(!err) {
                    console.log('file exists old');
                    return true;
                } else {
                    console.log('err: ', err);
                    return false;
                }
            }
        );*/
        // console.log(`${this.path}SampleCSVFile_2kb.csv`);
        // console.log('is SampleCSVFile_2kb.csv exist: ', isExist);
        // console.log('is SampleCSVFile_2kb.csv exist: ', isExistOld);
        // console.log(this.isFileExist(`${this.path}SampleCSVFile_2k.csv`));

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
