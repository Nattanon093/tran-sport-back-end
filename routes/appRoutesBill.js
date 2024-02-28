var BillController = require('../controllers/BillController');
var bill_model = require('../models/BillModels');

// generateBillNo

module.exports = function (app) {
    const key = '/api/v1';
    app.get(`${key}/bill/generateBillNo`, function (req, res) {
        BillController.generateBillNo(req.body, function (err, task) {
            console.log("task :", task);
            try {
                if (err) {
                    console.log("err :", err);
                    console.log('appRoutesBill.js app.get /bill/generateBillNo err');
                    return res.send(err);
                }
                console.log('appRoutesBill.js app.get /bill/generateBillNo success');
                return res.send(task);
            } catch (error) {
                return res.send(error);
            }
        });
    });
}

