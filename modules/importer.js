import { readFileSync } from "fs";
import csv from "csvtojson";
import { defaultEncoding } from './../config/index.json';

export default class Importer {
    /**
     * Imports
     * @param path
     * @returns {Promise<Converter | *>}
     */
    static async import(path) {
        return csv().fromFile(path); // if we use this.converter then we have an error like "write after end..." ???
    }

    /**
     * Imports synchronously
     * @param path
     * @returns {*|Converter}
     */
    static importSync(path) {
        const data = readFileSync(
            path,
            {
                encoding: defaultEncoding,
            }
        );

        return csv().fromString(data);
    }
}
