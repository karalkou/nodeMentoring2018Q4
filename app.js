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
    console.log('-- changed');
    const { type, file } = ev;

    if (type === "deleted") return null;

    const data = await importer.import(file.path);
    console.log('-- imported data: ', data);
});

dirWatcher.watch('./data/', 2000);
