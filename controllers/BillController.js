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
    // var responseBillListProduct = await BillModel.getBillListProductByBillNo(data);
    console.log('responseBill :',responseBill);
    // console.log('responseBillListProduct :',responseBillListProduct);
    // var response = {
    //     bill: responseBill,
    //     list_product: responseBillListProduct
    // }
    result(responseBill);
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