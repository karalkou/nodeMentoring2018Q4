import config from './config/index.json';
import { User, Product } from './models/index';
import DirWatcher from './modules/dirwatcher';

console.log('Hello Node.js project.');

console.log('config.name: ', config.name);

new User();
new Product();

new DirWatcher().watch('./data/', 2000);
