var UsersController = require('../controllers/UsersController');
var users_model = require('../models/UsersModels');

module.exports = function (app) {
    const key = '/api/v1';
    // getUsersByUserId
    app.get(`${key}/users/getUsersByUserId`, function (req, res) {
        console.log('appRoutesUsers.js app.get /users/getUsersByUserId');
        UsersController.getUsersByUserId(req.body, function (err, task) {
            console.log("task :", task);
            try {
                if (err) {
                    console.log("err :", err);
                    console.log('appRoutesUsers.js app.get /users/getUsersByUserId err');
                    return res.send(err);
                }
                console.log('appRoutesUsers.js app.get /users/getUsersByUserId success');
                return res.send(task);
            } catch (error) {
                return res.send(error);
            }
        });
    });
}