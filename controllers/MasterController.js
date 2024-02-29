var MasterModel = require('../models/MasterModels');

var Task = function (task) {
    this.task = task.task;
};

Task.getMasterPaymentType = async function getMasterPaymentType(data, result) {
    var response = await MasterModel.getMasterPaymentType(data);
    result(response);
};

module.exports = Task;