var ChequeModel = require('../models/ChequeModels');

var Task = function (task) {
    this.task = task.task;
};

Task.getCheque = async function getCheque(data, result) {
    try {
        var response = await ChequeModel.getCheque(data);
        result(response);
    } catch (error) {
        result(error);
    }
}

Task.createCheque = async function createCheque(data, result) {
    try {
        var issueDate = data.issueDate.split('/')
        var clearanceDate = data.clearanceDate.split('/')

        data.issueDate = (issueDate[2] - 543) + '-' + issueDate[1] + '-' + issueDate[0] + ' 00:00:00.000';
        data.clearanceDate = (clearanceDate[2] - 543) + '-' + clearanceDate[1] + '-' + clearanceDate[0] + ' 00:00:00.000';

        var response = await ChequeModel.createCheque(data);
        result(response);
    } catch (error) {
        result(error);
    }
}

Task.deleteCheque = async function deleteCheque(data, result) {
    try {
        var response = await ChequeModel.deleteCheque(data);
        result(response);
    } catch (error) {
        result(error);
    }
}

module.exports = Task;