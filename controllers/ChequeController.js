var ChequeModel = require('../models/ChequeModels');

var Task = function (task) {
    this.task = task.task;
};

Task.getCheque = async function getCheque(data, result) {
    var response = await ChequeModel.getCheque(data);
    result(response);
}

Task.createCheque = async function createCheque(data, result) {
    var response = await ChequeModel.createCheque(data);
    result(response);
}

// Task.deleteBill = async function deleteBill(data, result) {
//     var response = await BillModel.deleteBill(data);
//     result(response);
// }

module.exports = Task;