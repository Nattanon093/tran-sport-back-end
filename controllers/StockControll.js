var StockModel = require('../models/StockModels');

var Task = function (task) {
    this.task = task.task;
};

Task.getStock = async function getStock(data, result) {
    var response = await StockModel.getStock(data);
    result(response);
};

module.exports = Task;