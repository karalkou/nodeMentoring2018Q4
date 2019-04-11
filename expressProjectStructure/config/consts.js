const JWT_SECRET = "Do not tell it anyone";

module.exports = {
    JWTSecret: JWT_SECRET,
    facebookPassport: {
        app_id: "1592135727596634",
        app_secret: "5adb18d891785f00901c4b948926c236",
        callback: "http://localhost:9001/api/v1/auth/facebook/callback"
    },
    googlePassport: {
        clientID: "332519825202-m91vvjq3odcktrm806i7ieqbgc2a2o1g.apps.googleusercontent.com",
        clientSecret: "5Zb7EV_4jxCREtZsVmEsc7Ap",
        callbackURL: "http://localhost:9001/api/v1/auth/google/callback"
    },
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
