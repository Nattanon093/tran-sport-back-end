var StockController = require('../controllers/StockControll');
var stock_model = require('../models/StockModels');

module.exports = function (app) {
    const key = '/api/v1';
    app.get(`${key}/stock/getStock`, function (req, res) {
        StockController.getStock(req.body, function (err, task) {
            console.log("task :", task);
            try {
                if (err) {
                    console.log("err :", err);
                    console.log('appRoutesStock.js app.get /stock/getStockByStock err');
                    return res.send(err);
                }
                console.log('appRoutesStock.js app.get /stock/getStockByStock success');
                return res.send(task);
            } catch (error) {
                return res.send(error);
            }
        });
    });
}