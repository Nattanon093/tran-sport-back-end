var UsersController = require('../controllers/UsersController');
var users_model = require('../models/UsersModels');

module.exports = function (app) {
    const key = '/api/v1';

    // getUsers
    app.get(`${key}/users/getUsers`, function (req, res) {
        UsersController.getUsers(req.body, function (err, task) {
            try {
                if (err) {
                    return res.send(err);
                }
                return res.send(task);
            } catch (error) {
                return res.send(error);
            }
        });
    });

    // getUsersByUserId
    app.get(`${key}/users/getUsersByUserId`, function (req, res) {
        UsersController.getUsersByUserId(req.body, function (err, task) {
            try {
                if (err) {
                    return res.send(err);
                }
                return res.send(task);
            } catch (error) {
                return res.send(error);
            }
        });
    });
}