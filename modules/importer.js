import { readFileSync } from "fs";
import csv from "csvtojson";

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
                encoding: "utf-8",
            }
        );

        return csv().fromString(data);
    }
}
