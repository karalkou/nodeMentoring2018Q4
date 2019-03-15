import mongoose from 'mongoose';
import fs from 'fs';

import config from './../config/consts';
import CityModel from './models/city';
import ProductModel from './models/product';
import UserModel from './models/user';

const connectUrl = `${config.mongo.url}:${config.mongo.port}/${config.mongo.dbName}`;
const connectParams = { useNewUrlParser: true };

// connect to db
export default mongoose.connect(
    connectUrl,
    connectParams,
    async (error) => {
        if (!error) {
            try {
                const citiesFromDB = await CityModel.find({});
                const productsFromDB = await ProductModel.find({});
                const usersFromDB = await UserModel.find({});

                if (citiesFromDB.length === 0) {
                    const initialCities = fs.readFileSync(`${__dirname}/models/city.json`, 'utf8');
                    console.log('cities initializing');
                    await CityModel.create(JSON.parse(initialCities));
                }

                if (productsFromDB.length === 0) {
                    const initialProducts = fs.readFileSync(`${__dirname}/models/product.json`, 'utf8');
                    console.log('products initializing');
                    await ProductModel.create(JSON.parse(initialProducts));
                }

                if (usersFromDB.length === 0) {
                    const initialUsers = fs.readFileSync(`${__dirname}/models/user.json`, 'utf8');
                    console.log('users initializing');
                    await UserModel.create(JSON.parse(initialUsers));
                }

                console.log('DB started');
            } catch (err) {
                return Error('Something went wrong');
            }
        }

        return Error('Connection to DB error');
    }
);
