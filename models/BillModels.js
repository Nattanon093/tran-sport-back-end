var client = require('./BaseModel');
var Task = function (task) {
    this.task = task.task;
};

Task.generateBillNo = function generateBillNo(data, result) {
    return new Promise(function (resolve, reject) {
        var sql = "SELECT * FROM tb_invoice";
        client.query(sql, function (err, res) {
            let bill_no = '';
            if (res.rowCount > 0) {
                let last_bill_no = res.rows[0].bill_no;
                let last_year = last_bill_no.substring(0, 2);
                let last_no = last_bill_no.substring(2, 8);
                let current_year_th = new Date().getFullYear() + 543;
                let current_year = current_year_th.toString().substring(2, 4);
                if (current_year == last_year) {
                    let new_no = parseInt(last_no) + 1;
                    bill_no = current_year + new_no.toString().padStart(6, '0');
                } else {
                    bill_no = current_year + '000001';
                }
            } else {
                let current_year_th = new Date().getFullYear() + 543;
                bill_no = current_year_th.toString().substring(2, 4) + '000001';
            }

            const require = {
                data: bill_no,
                error: err,
                query_result: true,
            };
            resolve(require);
        });
        client.end;
    });
};

Task.getBill = function getBill(data, result) {
    return new Promise(function (resolve, reject) {
        var sql = "SELECT * FROM tb_invoice ORDER BY bill_no DESC";
        client.query(sql, function (err, res) {
            const require = {
                data: res.rows,
                error: err,
                query_result: true,
            };
            resolve(require);
        });
        client.end;
    });
};

Task.getBillByBillNo = function getBillByBillNo(data, result) {
    return new Promise(function (resolve, reject) {
        var sql = "SELECT * FROM tb_invoice WHERE bill_no = '" + data.bill_no + "'";
        client.query(sql, function (err, res) {
            const require = {
                data: res.rows,
                error: err,
                query_result: true,
            };
            resolve(require);
        });
        client.end;
    });
}

Task.getBillByCustomer = function getBillByCustomer(data, result) {
    return new Promise(function (resolve, reject) {
        var sql = "SELECT * FROM tb_invoice WHERE customer_id = '" + data.customer_id + "'";
        client.query(sql, function (err, res) {
            const require = {
                data: res.rows,
                error: err,
                query_result: true,
            };
            resolve(require);
        });
        client.end;
    });
}

Task.getBillByDate = function getBillByDate(data, result) {
    return new Promise(function (resolve, reject) {
        var sql = "SELECT * FROM tb_invoice WHERE invoice_date BETWEEN '" + data.start_date + "' AND '" + data.end_date + "'";
        client.query(sql, function (err, res) {
            const require = {
                data: res.rows,
                error: err,
                query_result: true,
            };
            resolve(require);
        });
        client.end;
    });
}

Task.createBill = function createBill(data, result) {
    console.log('createBill :',data);
    // return new Promise(function (resolve, reject) {
    //     var sql = "INSERT INTO tb_invoice " +
    //         "( " +
    //         "payment_id, " +
    //         "user_id, " +
    //         "company_id, " +
    //         "invoice_type_id, " +
    //         "issue_date, " +
    //         "volume_no, " +
    //         "bill_number, " +
    //         "total, " +
    //         "payment, " +
    //         "net_balance, " +
    //         "note, " +
    //         "remart, " +
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
    //         "$10', " +
    //         "$11', " +
    //         "$12', " +
    //         "$13', " +
    //         "$14', " +
    //         "$15', " +
    //         "$16', " +
    //         ")";
    //     client.query(sql, [
    //         data.payment_id,
    //         data.user_id,
    //         data.company_id,
    //         data.invoice_type_id,
    //         data.issue_date,
    //         data.volume_no,
    //         data.bill_number,
    //         data.total,
    //         data.payment,
    //         data.net_balance,
    //         data.note,
    //         data.remart,
    //         data.create_by,
    //         data.create_date,
    //         data.update_by,
    //         data.update_date
    //     ], function (err, res) {
    //         const require = {
    //             data: res,
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