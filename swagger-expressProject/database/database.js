const mongoose = require('mongoose');
const fs = require('fs');

const config = require('./../config/consts');
const CityModel = require('./models/city');
const ProductModel = require('./models/product');
const UserModel = require('./models/user');

const connectUrl = `${config.mongo.url}:${config.mongo.port}/${config.mongo.dbName}`;
const connectParams = { useNewUrlParser: true };

// connect to db
module.exports = mongoose.connect(
    connectUrl,
    connectParams,
    async (error) => {
        if (!error) {
            console.log('---- connecting to DB...');
            try {
                const citiesFromDB = await CityModel.find({});
                const productsFromDB = await ProductModel.find({});
                const usersFromDB = await UserModel.find({});

                if (citiesFromDB.length === 0) {
                    const initialCities = fs.readFileSync(`${__dirname}/fixtures/cities.json`.replace(/\\/g, '/'), 'utf8');
                    console.log('cities initializing...');
                    await CityModel.create(JSON.parse(initialCities), (err) => {
                        if (err) {
                            return console.log(err);
                        }
                        console.log('cities is uploaded')
                    });
                }

                if (productsFromDB.length === 0) {
                    const initialProducts = fs.readFileSync(`${__dirname}/fixtures/products.json`.replace(/\\/g, '/'), 'utf8');
                    console.log('products initializing...');
                    await ProductModel.create(JSON.parse(initialProducts), (err) => {
                        if (err) {
                            return console.log(err);
                        }
                        console.log('products is uploaded')
                    });
                }

                if (usersFromDB.length === 0) {
                    const initialUsers = fs.readFileSync(`${__dirname}/fixtures/users.json`.replace(/\\/g, '/'), 'utf8');
                    console.log('users initializing...');
                    await UserModel.create(JSON.parse(initialUsers), (err) => {
                        if (err) {
                            return console.log(err);
                        }
                        console.log('users is uploaded')
                    });
                }

                console.log('DB started');
            } catch (err) {
                return Error('Something went wrong');
            }
        }

        return Error('Connection to DB error');
    }
);
