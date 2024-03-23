var AuthenModel = require('../models/AuthenModels');

var Task = function (task) {
    this.task = task.task;
};

Task.getAuthen = async function getAuthen(data, result) {
    try {
        var response = await AuthenModel.getAuthen(data);
        result(response);
    } catch (error) {
        result(error);
    }
}

Task.login = async function login(data, result) {
    try {
        var response = await AuthenModel.login(data);
        result(response);
    } catch (error) {
        result(error);
    }
};

Task.refreshToken = async function refreshToken(data, result) {
    try {
        var response = await AuthenModel.refreshToken(data);
        result(response);
    } catch (error) {
        result(error);
    }
};
module.exports = Task;