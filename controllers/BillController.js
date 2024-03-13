var BillModel = require('../models/BillModels');

var Task = function (task) {
    this.task = task.task;
};

Task.generateBillNo = async function generateBillNo(data, result) {
    var response = await BillModel.generateBillNo(data);
    result(response);
}

Task.getBill = async function getBill(data, result) {
    var response = await BillModel.getBill(data);
    result(response);
}

Task.getBillByBillNo = async function getBillByBillNo(data, result) {
    var responseBill = await BillModel.getBillByBillNo(data);
    if (responseBill.data.length > 0) {
        var responseBillListProduct = await BillModel.getBillListProductByBillNo(responseBill.data[0].billid);
        responseBill.data[0].listProduct = responseBillListProduct.data;
        result(responseBill);
    } else {
        result(responseBill);
    }
}

Task.getBillByCustomer = async function getBillByCustomer(data, result) {
    var response = await BillModel.getBillByCustomer(data);
    result(response);
}

Task.getBillByDate = async function getBillByDate(data, result) {
    var response = await BillModel.getBillByDate(data);
    result(response);
}

Task.createBill = async function createBill(data, result) {
  
    var receiveDate = data.receiveDate.split('/');
    var issueDate = data.issueDate.split('/');
    data.receiveDate = (receiveDate[2] - 543) + '-' + receiveDate[1] + '-' + receiveDate[0] + ' 00:00:00.000';
    data.issueDate = (issueDate[2] - 543) + '-' + issueDate[1] + '-' + issueDate[0] + ' 00:00:00.000';
    var response = await BillModel.createBill(data);
    result(response);
}

Task.updateBill = async function updateBill(data, result) {
    var response = await BillModel.updateBill(data);
    result(response);
}

Task.deleteBill = async function deleteBill(data, result) {
    var response = await BillModel.deleteBill(data);
    result(response);
}

module.exports = Task;