var client = require('./BaseModel');
var Task = function (task) {
    this.task = task.task;
};

Task.generateBillNo = function generateBillNo(data, result) {
    return new Promise(function (resolve, reject) {
        var sql = "SELECT * FROM tb_invoice";
        client.query(sql, function (err, res) {
            let bill_no = '';
            if (res?.rowCount > 0) {
                let last_bill_no = res?.rows[0].bill_no;
                let last_year = last_bill_no?.substring(0, 2);
                let last_no = last_bill_no?.substring(2, 8);
                let current_year_th = new Date().getFullYear() + 543;
                let current_year = current_year_th.toString()?.substring(2, 4);
                if (current_year == last_year) {
                    let new_no = parseInt(last_no) + 1;
                    bill_no = current_year + new_no.toString().padStart(6, '0');
                } else {
                    bill_no = current_year + '000001';
                }
            } else {
                let current_year_th = new Date().getFullYear() + 543;
                bill_no = current_year_th.toString()?.substring(2, 4) + '000001';
            }
            if (err) {
                const require = {
                    data: [],
                    error: err,
                    query_result: false,
                };
                reject(require);
            }
            else {
                const require = {
                    data: bill_no,
                    error: err,
                    query_result: true,
                };
                resolve(require);
            }
        });
        client.end;
    });
};

Task.getBill = function getBill(data, result) {
    return new Promise(function (resolve, reject) {
        var sql = "SELECT * FROM tb_invoice ORDER BY bill_no DESC";
        client.query(sql, function (err, res) {
            if (err) {
                const require = {
                    data: [],
                    error: err,
                    query_result: false,
                };
                reject(require);
            } else {
                const require = {
                    data: res.rows,
                    error: err,
                    query_result: true,
                };
                resolve(require);
            }
        });
        client.end;
    });
};

Task.getBillByBillNo = function getBillByBillNo(data, result) {
    return new Promise(function (resolve, reject) {
        var sql = "SELECT * FROM tb_invoice WHERE bill_no = '" + data.bill_no + "'";
        client.query(sql, function (err, res) {
            if (err) {
                const require = {
                    data: [],
                    error: err,
                    query_result: false,
                };
                reject(require);
            } else {
                const require = {
                    data: res.rows,
                    error: err,
                    query_result: true,
                };
                resolve(require);
            }
        });
        client.end;
    });
}

Task.getBillByCustomer = function getBillByCustomer(data, result) {
    return new Promise(function (resolve, reject) {
        var sql = "SELECT * FROM tb_invoice WHERE customer_id = '" + data.customer_id + "'";
        client.query(sql, function (err, res) {
            if (err) {
                const require = {
                    data: [],
                    error: err,
                    query_result: false,
                };
                reject(require);
            } else {
                const require = {
                    data: res.rows,
                    error: err,
                    query_result: true,
                };
                resolve(require);
            }
        });
        client.end;
    });
}

Task.getBillByDate = function getBillByDate(data, result) {
    return new Promise(function (resolve, reject) {
        var sql = "SELECT * FROM tb_invoice WHERE invoice_date BETWEEN '" + data.start_date + "' AND '" + data.end_date + "'";
        client.query(sql, function (err, res) {
            if (err) {
                const require = {
                    data: [],
                    error: err,
                    query_result: false,
                };
                reject(require);
            } else {
                const require = {
                    data: res.rows,
                    error: err,
                    query_result: true,
                };
                resolve(require);
            }
        });
        client.end;
    });
}

Task.createBill = function createBill(data, result) {
    // console.log('createBill :', data);
    let date = new Date().toLocaleString("en-US", {timeZone: "Asia/Jakarta"});
    let dateTime = date.toString();

    return new Promise(function (resolve, reject) {
        var sql = "INSERT INTO tb_invoice ( " +
            "payment_id, " +
            "user_id, " +
            "company_id, " +
            "invoice_type_id, " +
            "issue_date, " +
            "volume_no, " +
            "bill_number, " +
            "total, " +
            "payment, " +
            "net_balance, " +
            "note, " +
            "remart, " +
            "create_by, " +
            "create_date, " +
            "update_by, " +
            "update_date, " +
            "active_flag )" +
            "VALUES( " +
            "$1, " +
            "$2, " +
            "$3, " +
            "$4, " +
            "$5, " +
            "$6, " +
            "$7, " +
            "$8, " +
            "$9, " +
            "$10, " +
            "$11, " +
            "$12, " +
            "$13, " +
            "$14, " +
            "$15, " +
            "$16, " +
            "$17 " + 
            ") " + 
            "RETURNING id";
        console.log('sql :', sql);
        client.query(sql,[
            data.paymentTypeId,
            data.billUserId,
            data.typeId,
            data.typeId,
            dateTime,
            data.bookNo,
            data.billNo,
            data.sum,
            data.paymentTypeId,
            data.remaining,
            data.note,
            data.remark,
            'admin',
            dateTime,
            'admin',
            dateTime,
            'Y'
        ], function (err, res) {
            if (err) {
                const require = {
                    data: [],
                    error: err,
                    query_result: false,
                };
                reject(require);
            } else {
                let invoice_id = res?.rows[0].id;
                let listProduct = data.listProduct;
                listProduct.forEach(element => {
                    element.invoice_id = invoice_id;
                    Task.createListProduct(element, function (res) {
                        // console.log('createListProduct :', res);
                    });
                });

                const require = {
                    data: res.rows,
                    error: err,
                    query_result: true,
                };
                resolve(require);
            }
        });
        client.end;
    });
}

Task.createListProduct = function createListProduct(data, result) {
    console.log('createListProduct :', data);
    // return new Promise(function (resolve, reject) {
    //     var sql = "INSERT INTO tb_invoice_detail " +
    //         "( " +
    //         "invoice_id, " +
    //         "product_id, " +
    //         "qty, " +
    //         "price, " +
    //         "total, " +
    //         "create_by, " +
    //         "create_date, " +
    //         "update_by, " +
    //         "update_date, " +
    //         ") " +
    //         "VALUES('" +
    //         "$1', " +
    //         "$2', " +
    //         "$3', " +
    //         "$4', " +
    //         "$5', " +
    //         "$6', " +
    //         "$7', " +
    //         "$8', " +
    //         "$9', " +
    //         ")";
    //     client.query(sql, [
    //         data.invoice_id,
    //         data.product_id,
    //         data.qty,
    //         data.price,
    //         data.total,
    //         data.create_by,
    //         data.create_date,
    //         data.update_by,
    //         data.update_date,
    //         'Y'
    //     ], function (err, res) {
    //         const require = {
    //             data: res.rows,
    //             error: err,
    //             query_result: true,
    //         };
    //         resolve(require);
    //     });
    //     client.end;
    // });

    return null;
}


module.exports = Task;