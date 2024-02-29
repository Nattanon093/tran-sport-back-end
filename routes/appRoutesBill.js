var BillController = require('../controllers/BillController');
var bill_model = require('../models/BillModels');

// generateBillNo

module.exports = function (app) {
    const key = '/api/v1';
    app.get(`${key}/bill/generateBillNo`, function (req, res) {
        BillController.generateBillNo(req.body, function (err, task) {
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

