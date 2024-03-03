var MasterController = require('../controllers/MasterController');
var master_model = require('../models/MasterModels');

module.exports = function (app) {
    const key = '/api/v1';
    app.get(`${key}/master/getMasterPaymentType`, function (req, res) {
        MasterController.getMasterPaymentType(req.body, function (err, task) {
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

    app.get(`${key}/master/getMasterBank`, function (req, res) {
        MasterController.getMasterBank(req.body, function (err, task) {
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

    app.get(`${key}/master/getMasterChequePaymentType`, function (req, res) {
        MasterController.getMasterChequePaymentType(req.body, function (err, task) {
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