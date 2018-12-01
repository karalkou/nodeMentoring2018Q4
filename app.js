import config from './config/index.json';
import { User, Product } from './models/index';

console.log('Hello Node.js project.');

console.log('config.name: ', config.name);

new User();
new Product();
