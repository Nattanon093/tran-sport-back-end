var StockModel = require('../models/StockModels');

var Task = function (task) {
    this.task = task.task;
};

Task.getStock = async function getStock(data, result) {
    try {
        var response = await StockModel.getStock(data);
        result(response);
    } catch (error) {
        result(error);
    }
};

module.exports = Task;