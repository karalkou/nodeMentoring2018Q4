const User = require("../../../expressProjectStructure/database/models/user");

const getUsers = (req, res) => {
    User.find({}, (error, users) => {
        if (error) {
            console.error("Error", error);
        }

        res.json(users);
    });
};

const addUser = (req, res) => {
    const { username, email, password, } = req.swagger.params.body.value;

    User.create({ username, email, password, }, (error, user) => {
        if (error) {
            console.error("Error", error);
        }

        res.send(user);
    });
};

const deleteUser = (req, res) => {
    const id = req.swagger.params.id.value;

    User.findOneAndDelete({ _id: id, }, (error, user) => {
        if (error) {
            console.error("Error", error);
        }

        res.send(user);
    });
};

module.exports = {
    getUsers: getUsers,
    addUser: addUser,
    deleteUser: deleteUser
};
