var client = require('./BaseModel');
var Task = function (task) {
    this.task = task.task;
};

Task.generateBillNo = function generateBillNo(data, result) {
    return new Promise(function (resolve, reject) {
        var sql = "SELECT bill_number FROM tb_invoice ORDER BY id DESC LIMIT 1";
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
        tb_invoice.net_balance AS remaining,
        tb_invoice.deposit,
        tb_invoice.status_invoice AS status,
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
        tb_invoice.id AS billId,
        tb_customer.deceased_name AS deceased,
        tb_customer.contact_person AS contact,
        tb_customer.customer_address AS address,
        tb_customer.mobile_no AS phone ,
        tb_customer.receive_from AS receive,
        tb_invoice.receive_date AS receiveDate,
        tb_invoice.receive_time AS receiveTime,
        tb_customer.send,
        company_id,
        company_name,
        tb_invoice.donate,
        tb_invoice.issue_date AS issueDate,
        tb_invoice.issue_time AS issueTime,
        bill_number AS billNo,
        volume_no AS bookNo,
        user_id,
        tb_users.firstname || ' ' || tb_users.lastname AS billUser,
        payment_id,
        tb_mas_payment.payment_name AS paymentName,
        total,
        net_balance AS remaining,
        deposit,
        pay_extra AS payExtra,
        price_after_discount AS priceAfterDiscount,
        (total - price_after_discount) AS discount,
        status_invoice AS status,
        note,
        remark
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
        tb_invoice.bill_number = $1`;

        client.query(sql, [
            data?.bill_no
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

Task.searchBill = function searchBill(data, result) {
    return new Promise(function (resolve, reject) {
        var sql = "SELECT " +
            "tb_invoice.id AS billId, " +
            "tb_customer.deceased_name AS deceased, " +
            "tb_customer.contact_person AS contact, " +
            "tb_customer.customer_address AS address, " +
            "tb_customer.mobile_no AS phone, " +
            "tb_customer.receive_from AS receive, " +
            "tb_invoice.receive_date AS receiveDate, " +
            "tb_invoice.receive_time AS receiveTime, " +
            "tb_customer.send, " +
            "company_id, " +
            "company_name, " +
            "tb_invoice.donate, " +
            "tb_invoice.issue_date AS issueDate, " +
            "tb_invoice.issue_time AS issueTime, " +
            "bill_number AS billNo, " +
            "volume_no AS bookNo, " +
            "user_id, " +
            "tb_users.firstname || ' ' || tb_users.lastname AS billUser, " +
            "payment_id, " +
            "tb_mas_payment.payment_name AS paymentName, " +
            "total, " +
            "net_balance AS remaining, " +
            "deposit, " +
            "pay_extra AS payExtra, " +
            "price_after_discount AS priceAfterDiscount, " +
            "(total - price_after_discount) AS discount, " +
            "status_invoice AS status, " +
            "tb_invoice.create_date AS billDate, " +
            "note, " +
            "remark " +
            "FROM " +
            "tb_invoice " +
            "LEFT JOIN tb_customer ON " +
            "tb_invoice.id = tb_customer.invoice_id " +
            "LEFT JOIN tb_mas_invoice_type ON " +
            "tb_invoice.invoice_type_id = tb_mas_invoice_type.id " +
            "LEFT JOIN tb_mas_payment ON " +
            "tb_invoice.payment_id = tb_mas_payment.id " +
            "LEFT JOIN tb_users ON " +
            "tb_invoice.user_id = tb_users.id " +
            "LEFT JOIN tb_company ON " +
            "tb_invoice.company_id = tb_company.id " +
            "WHERE " +
            "tb_invoice.active_flag = 'Y' ";
        let params = [];
        let paramIndex = 1;
        if (data?.dateRange) {
            sql += "AND tb_invoice.create_date BETWEEN $" + (paramIndex++) + " AND $" + (paramIndex++) + "  ";
            params.push(data.dateRange[0], data.dateRange[1]);
        }
        if (data?.status) {
            sql += "AND tb_invoice.status_invoice = $" + (paramIndex++) + "  ";
            params.push(data.status);
        }
        if (data?.type) {
            sql += "AND tb_mas_payment.id = $" + (paramIndex++) + "  ";
            params.push(data.type);
        }
        sql += "ORDER BY tb_invoice.id DESC";
        client.query(sql, params, function (err, res) {
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
        var sql = `SELECT 
        tb_tem_stock.id AS listProductId,
        tb_tem_stock.invoice_id, 
        tb_tem_stock.stock_id,
        tb_tem_stock.stock_name,
        tb_tem_stock.stock_other,
        tb_tem_stock.amount_used,
        tb_tem_stock.price,
        tb_tem_stock.total_price,
        tb_stock.in_stock
        FROM tb_tem_stock 
        LEFT JOIN tb_stock ON tb_tem_stock.stock_id = tb_stock.id
        WHERE invoice_id = $1 AND tb_tem_stock.active_flag = 'Y' ORDER BY tb_tem_stock.id ASC`;
        client.query(sql, [
            data
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
    console.log('data :', data);
    return new Promise(function (resolve, reject) {
        var sql = "INSERT INTO tb_invoice ( " +
            "payment_id, " +
            "user_id, " +
            "company_id, " +
            "invoice_type_id, " +
            "issue_date, " +
            "issue_time, " +
            "donate, " +
            "receive_date, " +
            "receive_time, " +
            "volume_no, " +
            "bill_number, " +
            "price_after_discount, " +
            "deposit, " +
            "total, " +
            "payment, " +
            "net_balance, " +
            "note, " +
            "remark, " +
            "status_invoice, " +
            "create_by, " +
            "update_by )" +
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
            "$17, " +
            "$18, " +
            "$19, " +
            "$20, " +
            "$21 " +
            ") " +
            "RETURNING id";
        client.query(sql, [
            data.paymentTypeId,
            data.billUserId,
            data.typeId,
            data.typeId,
            data.issueDate,
            data.issueTime,
            data.donate,
            data.receiveDate,
            data.receiveTime,
            data.bookNo,
            data.billNo,
            data.priceAfterDiscount,
            data.deposit,
            data.sum,
            data.paymentTypeId,
            data.remaining,
            data.note,
            data.remark,
            '2',
            'admin',
            'admin',
        ], function (err, res) {
            if (err) {
                console.log('err :', err);
                const require = {
                    data: [],
                    status: 500,
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
                Task.createCustomerByInvoiceId(data, invoice_id, function (res) {
                    console.log('createCustomerByInvoiceId :', res);
                });
                const require = {
                    data: res.rows,
                    status: 200,
                    error: err,
                    query_result: true,
                };
                resolve(require);
            }
        });
        client.end;
    }
    );
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
            "stock_other, " +
            "amount_used, " +
            "price, " +
            "total_price " +
            ") " +
            "VALUES( " +
            "$1, " +
            "$2, " +
            "$3, " +
            "$4, " +
            "$5, " +
            "$6, " +
            "$7 " +
            ") " +
            "RETURNING id";
        client.query(sql, [
            data.invoice_id,
            data.stockId,
            data.stockName,
            data.stockOther,
            data.amount,
            data.price,
            data.totalPrice
        ], function (err, res) {
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
                if (data.stockName !== "อื่นๆ") {
                    Task.updateStock(stock_id, amount_used, function (res) {
                        console.log('updateStock :', res);
                    });
                }
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
            data.send,
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
            try {
                const require = {
                    data: res.rows,
                    error: err,
                    query_result: true,
                };
                resolve(require);
            } catch (error) {
                const require = {
                    data: [],
                    error: err,
                    query_result: false,
                };
                reject(require);
            }
        });
        client.end;
    });
}

Task.updateBill = function updateBill(data, result) {
    return new Promise(function (resolve, reject) {
        var sql = "UPDATE tb_invoice SET " +
            "payment_id = $1, " +
            "user_id = $2, " +
            "company_id = $3, " +
            "invoice_type_id = $4, " +
            "issue_date = $5, " +
            "issue_time = $6, " +
            "receive_date = $7, " +
            "receive_time = $8, " +
            "volume_no = $9, " +
            "bill_number = $10, " +
            "price_after_discount = $11, " +
            "deposit = $12, " +
            "pay_extra = $13, " +
            "total = $14, " +
            "payment = $15, " +
            "net_balance = $16, " +
            "note = $17, " +
            "remark = $18, " +
            "status_invoice = $19, " +
            "update_by = $20 " +
            "WHERE id = $21";
        client.query(sql, [
            data.paymentTypeId,
            data.billUserId,
            data.typeId,
            data.typeId,
            data.issueDate,
            data.issueTime,
            data.receiveDate,
            data.receiveTime,
            data.bookNo,
            data.billNo,
            data.priceAfterDiscount,
            data.deposit,
            data.payExtra,
            data.sum,
            data.paymentTypeId,
            data.remaining,
            data.note,
            data.remark,
            data.status,
            'admin',
            data.billId
        ], function (err, res) {
            try {
                if (err) {
                    const require = {
                        data: [],
                        error: err,
                        query_result: false,
                    };
                    reject(require);
                } else {
                    let listProduct = data.listProduct;
                    listProduct.forEach(element => {
                        if (element.stockName !== "อื่นๆ") {
                            if (element.listProductId) {
                                Task.getStockByStockId(element, function (res) {
                                    console.log('getStockByStockId res?.data[0], :', res?.data[0]);
                                });
                            } else {
                                element.invoice_id = data.billId;
                                Task.createListProduct(element, function (res) {
                                    console.log('createListProduct :', res);
                                });
                            }
                        } else {
                            if (element.listProductId) {
                                Task.updateListProduct(element, function (res) {
                                    console.log('updateListProduct :', res);
                                });
                            } else {
                                element.invoice_id = data.billId;
                                Task.createListProduct(element, function (res) {
                                    console.log('createListProduct :', res);
                                });
                            }
                        }
                    });
                    Task.updateCustomerByInvoiceId(data, function (res) {
                        console.log('updateCustomerByInvoiceId :', res);
                    });
                    const require = {
                        data: res,
                        error: err,
                        query_result: true,
                    };
                    resolve(require);
                }
            } catch (error) {
                console.log('error :', error);
            }
        });
        client.end;
    });
}

Task.updateListProduct = function updateListProduct(data, result) {
    return new Promise(function (resolve, reject) {
        var sql = "UPDATE tb_tem_stock SET " +
            "stock_id = $1, " +
            "stock_name = $2, " +
            "amount_used = $3, " +
            "price = $4, " +
            "total_price = $5, " +
            "update_by = $6, " +
            "update_date = $7 " +
            "WHERE id = $8";
        client.query(sql, [
            data.stockId,
            data.stockName,
            data.amount,
            data.price,
            data.totalPrice,
            data.update_by,
            data.update_date,
            data.listProductId
        ], function (err, res) {
            try {
                let stock_id = data.stockId;
                let amount_used = data.amount;
                const require = {
                    data: res.rows,
                    error: err,
                    query_result: true,
                };
                resolve(require);
            } catch (error) {
                console.log('updateListProduct error :', error);
                const require = {
                    data: [],
                    error: err,
                    query_result: false,
                };
                reject(require);
            }
        });
        client.end;
    });
}

Task.getStockByStockId = function getStockByStockId(data, result) {
    return new Promise(function (resolve, reject) {
        var sql = "SELECT tb_stock.in_stock, tb_tem_stock.amount_used " +
            "FROM tb_stock " +
            "LEFT JOIN tb_tem_stock ON tb_stock.id = tb_tem_stock.stock_id " +
            "WHERE tb_stock.id = " + data.stockId;
        client.query(sql, function (err, res) {
            try {
                let in_stock = res?.rows[0].in_stock;
                let amount_used_before = res?.rows[0].amount_used;
                let amount_used = data.amount;
                let amount_used_diff = amount_used_before > amount_used ? in_stock = parseInt(in_stock) + (parseInt(amount_used_before) - parseInt(amount_used)) : in_stock = parseInt(in_stock) - (parseInt(amount_used) - parseInt(amount_used_before))

                Task.updateStockByStockId(data, amount_used_diff, function (res) {
                    console.log('updateStockByStockId :', res);
                });

                const require = {
                    data: res,
                    error: err,
                    query_result: true,
                };
                resolve(require);
            } catch (error) {
                console.log('getStockByStockId error :', error);
                const require = {
                    data: [],
                    error: err,
                    query_result: false,
                };
                reject(require);
            }
        });
        client.end;
    });

}

Task.updateStockByStockId = function updateStockByStockId(data, in_stock, result) {
    return new Promise(function (resolve, reject) {
        var sql = "UPDATE tb_stock SET in_stock = " + in_stock + " WHERE id = " + data.stockId;
        client.query(sql, function (err, res) {
            try {
                Task.updateListProduct(data, function (res) {
                    console.log('updateListProduct :', res);
                });
                const require = {
                    data: res,
                    error: err,
                    query_result: true,
                };
                resolve(require);
            } catch (error) {
                const require = {
                    data: [],
                    error: err,
                    query_result: false,
                };
                reject(require);
            }
        });
        client.end;
    });
    return null
}

Task.updateCustomerByInvoiceId = function updateCustomerByInvoiceId(data, result) {
    return new Promise(function (resolve, reject) {
        var sql = "UPDATE tb_customer SET " +
            "deceased_name = $1, " +
            "contact_person = $2, " +
            "customer_address = $3, " +
            "mobile_no = $4, " +
            "receive_from = $5, " +
            "send = $6, " +
            "update_by = $7, " +
            "update_date = $8 " +
            "WHERE invoice_id = $9";
        client.query(sql, [
            data.deceased,
            data.contact,
            data.address,
            data.phone,
            data.receiveFrom,
            data.send,
            'admin',
            data.update_date,
            data.billId
        ], function (err, res) {
            try {
                const require = {
                    data: res.rows,
                    error: err,
                    query_result: true,
                };
                resolve(require);
            } catch (error) {
                const require = {
                    data: [],
                    error: err,
                    query_result: false,
                };
                reject(require);
            }
        });
        client.end;
    });

}

Task.deleteListProductByListProductId = function deleteListProductByListProductId(data, result) {
    return new Promise(function (resolve, reject) {
        var sql = "DELETE FROM tb_tem_stock WHERE id = $1";
        client.query(sql, [
            data.listProductId
        ], function (err, res) {
            try {
                const require = {
                    data: res,
                    error: err,
                    query_result: true,
                };
                resolve(require);
            } catch (error) {
                const require = {
                    data: [],
                    error: err,
                    query_result: false,
                };
                reject(require);
            }
        });
        client.end;
    });
}


module.exports = Task;