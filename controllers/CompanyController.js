var CompanyModel = require('../models/CompanyModels');

var Task = function (task) {
    this.task = task.task;
};

Task.getCompany = async function getCompany(data, result) {
    try {
        var response = await CompanyModel.getCompany(data);
        result(response);
    } catch (error) {
        result(error);
    }
};

Task.getCompanyById = async function getCompanyById(data, result) {
    try {
        var response = await CompanyModel.getCompanyById(data);
        result(response);
    } catch (error) {
        result(error);
    }
};

module.exports = Task;