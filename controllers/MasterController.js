var MasterModel = require('../models/MasterModels');

var Task = function (task) {
    this.task = task.task;
};

Task.getMasterPaymentType = async function getMasterPaymentType(data, result) {
    var response = await MasterModel.getMasterPaymentType(data);
    result(response);
};

Task.getMasterBank = async function getMasterBank(data, result) {
    var response = await MasterModel.getMasterBank(data);
    result(response);
};

Task.getMasterChequePaymentType = async function getMasterChequePaymentType(data, result) {
    var response = await MasterModel.getMasterChequePaymentType(data);
    result(response);
};

Task.getMasterDocument = async function getMasterDocument(data, result) {
    var response = await MasterModel.getMasterDocument(data);
    result(response);
};


module.exports = Task;