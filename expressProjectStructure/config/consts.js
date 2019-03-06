const JWT_SECRET = "Do not tell it anyone";

module.exports = {
    JWTSecret: JWT_SECRET,
    facebookPassport: {
        app_id: "1592135727596634",
        app_secret: "5adb18d891785f00901c4b948926c236",
        callback: "http://localhost:9001/api/v1/auth/facebook/callback"
    },
};
