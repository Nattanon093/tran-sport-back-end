var UsersModel = require('../models/UsersModels');

var Task = function (task) {
    this.task = task.task;
};

Task.getUsersByUserId = async function getUsersByUserId(data, result) {
    var response = await UsersModel.getUsersByUserId(data);
    result(response);
}

module.exports = Task;