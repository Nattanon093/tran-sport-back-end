var AuthenController = require('../controllers/AuthenController');
var authen_model = require('../models/AuthenModels');

module.exports = function (app) {
    const key = '/api/v1';
    app.get(`${key}/authorize/admin`, function (req, res) {
        console.log('appRoutesAuthen.js app.get /authen/getAuthen');
        AuthenController.getAuthen(req.body, function (err, task) {
            console.log("task :", task);
            try {
                if (err) {
                    console.log("err :", err);
                    console.log('appRoutesAuthen.js app.get /authen/getAuthen err');
                    return res.send(err);
                }
                console.log('appRoutesAuthen.js app.get /authen/getAuthen success');
                return res.send(task);
            } catch (error) {
                return res.send(error);
            }
        });
    });

    app.post(`${key}/authorize/login`, function (req, res) {
        console.log('appRoutesAuthen.js app.post /authen/login');
        AuthenController.login(req.body, function (err, task) {
            console.log("task :", task);
            try {
                if (err) {
                    console.log("err :", err);
                    console.log('appRoutesAuthen.js app.post /authen/login err');
                    return res.send(err);
                }
                console.log('appRoutesAuthen.js app.post /authen/login success');
                return res.send(task);
            } catch (error) {
                return res.send(error);
            }
        });
    });
}