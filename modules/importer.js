import { readFileSync } from "fs";
import csv from "csvtojson";

export default class Importer {
    constructor() {
        this.converter = csv();
    }

    /**
     * Imports
     * @param path
     * @returns {Promise<Converter | *>}
     */
    async import(path) {
        // console.log('-- !!! IMPORT !!! --');
        return csv().fromFile(path); // if we use this.converter then we have an error like "write after end..." ???
    }

    /**
     * Imports synchronously
     * @param path
     * @returns {*|Converter}
     */
    importSync(path) {
        const data = readFileSync(
            path,
            {
                encoding: "utf-8",
            }
        );

        return this.converter.fromString(data);
    }
}
