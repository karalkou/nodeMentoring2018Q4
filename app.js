import config from './config/index.json';
import { User, Product } from './models/index';
import { DirWatcher, Importer } from './modules';

console.log('Hello Node.js project.');

console.log('config.name: ', config.name);

new User();
new Product();

const dirWatcher = new DirWatcher();
const importer = new Importer();

dirWatcher.on('dirwatcher:changed', async (ev) => {
    const { type, file } = ev;
    console.log('!- * type: ', type);

    if (type === "deleted") return;

    const data = await importer.import(file.path);
    console.log(data);
});

dirWatcher.watch('./data/', 2000);
