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
                let last_bill_no = res?.rows[0].bill_number;
                let last_year = last_bill_no?.substring(2, 4);
                let last_no = last_bill_no?.substring(4, 10);
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
        var sql = `SELECT
        tb_invoice.id AS billId,
        tb_customer.deceased_name AS deceased,
        tb_customer.contact_person AS contact,
        tb_customer.customer_address AS address,
        tb_customer.mobile_no AS phone ,
        tb_customer.receive_from AS receiveFrom,
        tb_customer.send,
        tb_invoice.company_id,
        tb_company.company_name,
        bill_number AS billNo,
        tb_invoice.volume_no AS bookNo,
        tb_invoice.user_id,
        tb_invoice.payment_id,
        tb_mas_payment.payment_name AS paymentName,
        tb_invoice.total,
        tb_invoice.create_date AS billDate
    FROM
        tb_invoice
    LEFT JOIN tb_customer ON
        tb_invoice.id = tb_customer.invoice_id
    LEFT JOIN tb_mas_invoice_type ON
        tb_invoice.invoice_type_id = tb_mas_invoice_type.id
    LEFT JOIN tb_mas_payment ON
        tb_invoice.payment_id = tb_mas_payment.id
    LEFT JOIN tb_users ON
        tb_invoice.user_id = tb_users.id
    LEFT JOIN tb_company ON
        tb_invoice.company_id = tb_company.id
    WHERE
     tb_invoice.active_flag = 'Y' ORDER BY tb_invoice.id DESC`;
        client.query(sql, function (err, res) {
            console.log('err :', err);
            console.log('res :', res.rows);
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
        var sql = `SELECT
        tb_customer.deceased_name AS deceased,
        tb_customer.contact_person AS contact,
        tb_customer.customer_address AS address,
        tb_customer.mobile_no AS phone ,
        tb_customer.receive_from AS receive,
        tb_customer.send,
        company_id,
        company_name,
        bill_number AS billNo,
        volume_no AS bookNo,
        user_id,
        payment_id,
        total
    FROM
        tb_invoice
    LEFT JOIN tb_customer ON
        tb_invoice.id = tb_customer.invoice_id
    LEFT JOIN tb_mas_invoice_type ON
        tb_invoice.invoice_type_id = tb_mas_invoice_type.id
    LEFT JOIN tb_mas_payment ON
        tb_invoice.payment_id = tb_mas_payment.id
    LEFT JOIN tb_users ON
        tb_invoice.user_id = tb_users.id
    LEFT JOIN tb_company ON
        tb_invoice.company_id = tb_company.id
    WHERE
        tb_invoice.id = $1`;

        client.query(sql, [
            data.id
        ], function (err, res) {
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

Task.getBillListProductByBillNo = function getBillListProductByBillNo(data, result) {
    return new Promise(function (resolve, reject) {
        var sql = "SELECT * FROM tb_tem_stock WHERE invoice_id = '" + data.id + "'";
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
    let date = new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" });
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
            "remark, " +
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
        client.query(sql, [
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
                        console.log('createListProduct :', res);
                    });
                });
                // createCustomerByInvoiceId 
                Task.createCustomerByInvoiceId(data, invoice_id, function (res) {
                    console.log('createCustomerByInvoiceId :', res);
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
    let date = new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" });
    let dateTime = date.toString();
    return new Promise(function (resolve, reject) {
        var sql = "INSERT INTO tb_tem_stock " +
            "( " +
            "invoice_id, " +
            "stock_id, " +
            "stock_name, " +
            "amount_used, " +
            "price, " +
            "total_price, " +
            "create_by, " +
            "create_date, " +
            "update_by, " +
            "update_date, " +
            "active_flag " +
            ") " +
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
            "$11 " +
            ") " +
            "RETURNING id";
        client.query(sql, [
            data.invoice_id,
            data.stockId,
            data.stockName,
            data.amount,
            data.price,
            data.totalPrice,
            data.create_by,
            dateTime,
            dateTime,
            data.update_date,
            'Y'
        ], function (err, res) {
            console.log('createListProduct err :', err);
            if (err) {
                const require = {
                    data: [],
                    error: err,
                    query_result: false,
                };
                reject(require);
            } else {
                let stock_id = data.stockId;
                let amount_used = data.amount;
                Task.updateStock(stock_id, amount_used, function (res) {
                    console.log('updateStock :', res);
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

Task.createCustomerByInvoiceId = function createCustomerByInvoiceId(data, invoice_id, result) {
    let date = new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" });
    let dateTime = date.toString();
    return new Promise(function (resolve, reject) {
        var sql = "INSERT INTO tb_customer " +
            "( " +
            "invoice_id, " +
            "deceased_name, " +
            "contact_person, " +
            "customer_address, " +
            "mobile_no, " +
            "receive_from, " +
            // "receive_time, " +
            "send, " +
            "create_by, " +
            "create_date, " +
            "update_by, " +
            "update_date, " +
            "active_flag " +
            ") " +
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
            "$12 " +
            ") " +
            "RETURNING id";
        client.query(sql, [
            invoice_id,
            data.deceased,
            data.contact,
            data.address,
            data.phone,
            data.receiveFrom,
            // data.receiveDate,
            // data.receiveTime,
            data.send,
            'admin',
            dateTime,
            'admin',
            dateTime,
            'Y'
        ], function (err, res) {
            console.log('createCustomerByInvoiceId err :', err);
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

Task.updateStock = function updateStock(stock_id, amount_used, result) {
    return new Promise(function (resolve, reject) {
        var sql = "UPDATE tb_stock SET in_stock = in_stock - " + amount_used + " WHERE id = " + stock_id;
        client.query(sql, function (err, res) {
            console.log('updateStock err :', err);
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


module.exports = Task;