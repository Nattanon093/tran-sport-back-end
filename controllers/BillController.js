var BillModel = require('../models/BillModels');
var moment = require('moment');

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
    // if (responseBill.data[0].issuedate) {
    //     var issueDate = responseBill.data[0].issuedate.toISOString().split('T')[0].split('-');
    //     var date = (parseInt(issueDate[0]) + 543) + '-' + issueDate[1] + '-' + issueDate[2] + ' 00:00:00.000';
    //     responseBill.data[0].issuedate = new Date(date);
    // }
    // if (responseBill.data[0].receivedate) {
    //     var receiveDate = responseBill.data[0].receivedate.toISOString().split('T')[0].split('-');
    //     var date = (parseInt(receiveDate[0]) + 543) + '-' + receiveDate[1] + '-' + receiveDate[2] + ' 00:00:00.000';
    //     responseBill.data[0].receivedate = new Date(date);
    // }
    if (responseBill?.data[0]?.issuedate) {
        var issueDate = new Date(responseBill?.data[0]?.issuedate);
        var issueDateStr = issueDate.getDate() + '/' + (issueDate.getMonth() + 1) + '/' + (issueDate.getFullYear() + 543);
        responseBill.data[0].issuedate = moment(issueDateStr, 'DD/MM/YYYY').format('DD/MM/YYYY');
    }
    if (responseBill?.data[0]?.receivedate) {
        var receiveDate = new Date(responseBill?.data[0]?.receivedate);
        var receiveDateStr = receiveDate.getDate() + '/' + (receiveDate.getMonth() + 1) + '/' + (receiveDate.getFullYear() + 543);
        responseBill.data[0].receivedate = moment(receiveDateStr, 'DD/MM/YYYY').format('DD/MM/YYYY');
    }
    if (responseBill?.data?.length > 0) {
        var responseBillListProduct = await BillModel.getBillListProductByBillNo(responseBill?.data[0]?.billid);
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