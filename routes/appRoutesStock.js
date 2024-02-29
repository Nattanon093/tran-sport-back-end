var StockController = require('../controllers/StockControll');
var stock_model = require('../models/StockModels');

module.exports = function (app) {
    const key = '/api/v1';
    app.get(`${key}/stock/getStock`, function (req, res) {
        StockController.getStock(req.body, function (err, task) {
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