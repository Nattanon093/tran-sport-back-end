var AuthenModel = require('../models/AuthenModels');

var Task = function (task) {
    this.task = task.task;
};

Task.getAuthen = async function getAuthen(data, result) {
    var response = await AuthenModel.getAuthen(data);
    console.log('getAuthen response', response);
    result(response);
}

module.exports = Task;