import { EventEmitter } from "events";

export default class DirWatcher extends EventEmitter {
    constructor() {
        super();
        this.path = null;
        this.delay = 0;
        this.files = [];
    }

    watch(path, delay) {
        this.path = path;
        this.delay = delay;
        this.check();
    }

    check() {}
}
