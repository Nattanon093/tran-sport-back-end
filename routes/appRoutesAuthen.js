var AuthenController = require('../controllers/AuthenController');
var authen_model = require('../models/AuthenModels');

module.exports = function (app) {
    const key = '/api/v1';
    app.get(`${key}/authorize/admin`, function (req, res) {
        AuthenController.getAuthen(req.body, function (err, task) {
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

    app.post(`${key}/authorize/login`, function (req, res) {
        AuthenController.login(req.body, function (err, task) {
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

    app.post(`${key}/authorize/refresh-token`, function (req, res) {
        AuthenController.refreshToken(req.body, function (err, task) {
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