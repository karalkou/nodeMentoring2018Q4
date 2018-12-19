import { name, pathToWatch } from './config/index.json';
import { DIR_WATCHER_CHANGED } from "./config/constants";
import { User, Product } from './models/index';
import { DirWatcher, Importer } from './modules';

console.log('Hello Node.js project.');

console.log('config.name: ', name);

new User();
new Product();

const dirWatcher = new DirWatcher();

dirWatcher.on(DIR_WATCHER_CHANGED, async (ev) => {
    const { type, file } = ev;
    console.log('-- event type: ', type);

    if (type === "deleted") return;

    const data = await Importer.import(file.path);
    console.log('-- data:\n', data);
});

dirWatcher.watch(pathToWatch, 1000);
