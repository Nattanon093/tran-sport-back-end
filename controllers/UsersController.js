var UsersModel = require('../models/UsersModels');

var Task = function (task) {
    this.task = task.task;
};

Task.getUsers = async function getUsers(data, result) {
    try {
        var response = await UsersModel.getUsers(data);
        result(response);
    } catch (error) {
        result(error);
    }
}

Task.getUsersByUserId = async function getUsersByUserId(data, result) {
    try {
        var response = await UsersModel.getUsersByUserId(data);
        result(response);
    } catch (error) {
        result(error);
    }
}

module.exports = Task;