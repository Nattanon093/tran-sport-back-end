var AuthenModel = require('../models/AuthenModels');

var Task = function (task) {
    this.task = task.task;
};

Task.getAuthen = async function getAuthen(data, result) {
    var response = await AuthenModel.getAuthen(data);
    console.log('getAuthen response', response);
    result(response);
}

Task.login = async function login(data, result) {
    var response = await AuthenModel.login(data);
    result(response);
};

Task.refreshToken = async function refreshToken(data, result) {
    var response = await AuthenModel.refreshToken(data);
    result(response);
};
module.exports = Task;