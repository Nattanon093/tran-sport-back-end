var BillModel = require('../models/BillModels');

var Task = function (task) {
    this.task = task.task;
};

Task.generateBillNo = async function generateBillNo(data, result) {
    var response = await BillModel.generateBillNo(data);
    result(response);
}

module.exports = Task;