module.exports = {
    mongo: {
        url: 'mongodb://localhost',
        port: 27017,
        dbName: 'nodementoring',
        collectionsToModelMap: {
            cities: 'City',
            users: 'User',
            products: 'Product'
        }
    }
};
