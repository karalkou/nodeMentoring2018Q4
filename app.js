import { name, pathToWatch } from './config/index.json';
import { User, Product } from './models/index';
import { DirWatcher, Importer } from './modules';

console.log('Hello Node.js project.');

console.log('config.name: ', name);

new User();
new Product();

const dirWatcher = new DirWatcher();

dirWatcher.on('dirwatcher:changed', async (ev) => {
    const { type, file } = ev;

    if (type === "deleted") return;

    const data = await Importer.import(file.path);
    console.log('-- data:\n', data);
});

dirWatcher.watch(pathToWatch, 2000);
