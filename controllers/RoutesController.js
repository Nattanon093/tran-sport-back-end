var RoutesModel = require('../models/RoutesModel');

var Task = function (task) {
    this.task = task.task;
};

Task.getProvinceAndDistrictAndSubDistrict = async function getProvinceAndDistrictAndSubDistrict(data, result) {
    try {
        var response = await RoutesModel.getProvinceAndDistrictAndSubDistrict(data);
        result(response);
    } catch (error) {
        result(error);
    }
};

Task.getDeliveryService = async function getDeliveryService(data, result) {
    try {
        var response = await RoutesModel.getDeliveryService(data);
        result(response);
    } catch (error) {
        result(error);
    }
};

Task.getParcelBoxSize = async function getParcelBoxSize(data, result) {
    try {
        var response = await RoutesModel.getParcelBoxSize(data);
        result(response);
    } catch (error) {
        result(error);
    }
}

module.exports = Task;