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
}