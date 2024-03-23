var MasterModel = require('../models/MasterModels');

var Task = function (task) {
    this.task = task.task;
};

Task.getMasterPaymentType = async function getMasterPaymentType(data, result) {
    try {
        var response = await MasterModel.getMasterPaymentType(data);
        result(response);
    } catch (error) {
        result(error);
    }
};

Task.getMasterBank = async function getMasterBank(data, result) {
    try {
        var response = await MasterModel.getMasterBank(data);
        result(response);
    } catch (error) {
        result(error);
    }
};

Task.getMasterChequePaymentType = async function getMasterChequePaymentType(data, result) {
    try {
        var response = await MasterModel.getMasterChequePaymentType(data);
        result(response);
    } catch (error) {
        result(error);
    }
};

Task.getMasterDocument = async function getMasterDocument(data, result) {
    try {
        var response = await MasterModel.getMasterDocument(data);
        result(response);
    } catch (error) {
        result(error);
    }
};

Task.getMasterChequeStatus = async function getMasterChequeStatus(data, result) {
    try {
        var response = await MasterModel.getMasterChequeStatus(data);
        result(response);
    } catch (error) {
        result(error);
    }
};


module.exports = Task;