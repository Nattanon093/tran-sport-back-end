var CompanyModel = require('../models/CompanyModels');

var Task = function (task) {
    this.task = task.task;
};

Task.getCompany = async function getCompany(data, result) {
    var response = await CompanyModel.getCompany(data);
    result(response);
};

Task.getCompanyById = async function getCompanyById(data, result) {
    var response = await CompanyModel.getCompanyById(data);
    result(response);
};

module.exports = Task;