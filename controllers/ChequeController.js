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

Task.deleteCheque = async function deleteCheque(data, result) {
    var response = await ChequeModel.deleteCheque(data);
    result(response);
}

module.exports = Task;