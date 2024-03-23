var BillModel = require('../models/BillModels');
var moment = require('moment');

var Task = function (task) {
    this.task = task.task;
};

Task.generateBillNo = async function generateBillNo(data, result) {
    try {
        var response = await BillModel.generateBillNo(data);
        result(response);
    } catch (error) {
        result(error);
    }
}

Task.getBill = async function getBill(data, result) {
    try {
        var response = await BillModel.getBill(data);
        result(response);
    } catch (error) {
        result(error);
    }
}

Task.getBillByBillNo = async function getBillByBillNo(data, result) {
    try {
        var responseBill = await BillModel.getBillByBillNo(data);
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
    } catch (error) {
        result(error);
    }
}

Task.getBillByCustomer = async function getBillByCustomer(data, result) {
    try {
        var response = await BillModel.getBillByCustomer(data);
        result(response);
    } catch (error) {
        result(error);
    }
}

Task.getBillByDate = async function getBillByDate(data, result) {
    try {
        var response = await BillModel.getBillByDate(data);
        result(response);
    } catch (error) {
        result(error);
    }
}

Task.createBill = async function createBill(data, result) {
    try {
        var receiveDate = data.receiveDate.split('/');
        var issueDate = data.issueDate.split('/');
        data.receiveDate = (receiveDate[2] - 543) + '-' + receiveDate[1] + '-' + receiveDate[0] + ' 00:00:00.000';
        data.issueDate = (issueDate[2] - 543) + '-' + issueDate[1] + '-' + issueDate[0] + ' 00:00:00.000';
        var response = await BillModel.createBill(data);
        result(response);
    }
    catch (error) {
        result(error);
    }
}

Task.updateBill = async function updateBill(data, result) {
    try {
        var receiveDate = data.receiveDate.split('/');
        var issueDate = data.issueDate.split('/');
        data.receiveDate = (receiveDate[2] - 543) + '-' + receiveDate[1] + '-' + receiveDate[0] + ' 00:00:00.000';
        data.issueDate = (issueDate[2] - 543) + '-' + issueDate[1] + '-' + issueDate[0] + ' 00:00:00.000';
        var response = await BillModel.updateBill(data);
        result(response);
    }
    catch (error) {
        result(error);
    }
}

Task.deleteBill = async function deleteBill(data, result) {
    try {
        var response = await BillModel.deleteBill(data);
        result(response);
    }
    catch (error) {
        result(error);
    }
}

module.exports = Task;