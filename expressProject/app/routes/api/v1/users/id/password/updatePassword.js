const Router = require('express').Router;

module.exports = Router({ mergeParams: true })
    .put('/v1/users/:id/password', async (req, res, next) => {
        try {
            const user = await req.db.User.findById(req.params.id);
            user.password = req.body.password;
            await user.save();
            res.sendStatus(204)
        } catch (error) {
            next(error)
        }
    });
