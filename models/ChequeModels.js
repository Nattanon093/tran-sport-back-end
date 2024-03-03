var client = require("./BaseModel");
var Task = function (task) {
  this.task = task.task;
};

Task.getCheque = function getCheque(data, result) {
  return new Promise(function (resolve, reject) {
    var sql =
    `select tmb.bank_name as bank_name,
      tc.cheque_number as cheque_number ,
      tc.payee_only as payee_only ,
      tc.cheque_issue_date as cheque_issue_date,
      tc.cheque_clearance_date as cheque_clearance_date,
      tc.cheque_payment_remark as cheque_payment_remark,
      tc.amount as amount,
      tmpt.payment_type_name as payment_type_name
      from tb_cheque tc 
      left join tb_mas_bank tmb on tmb.id = tc.bank_id and tmb.active_flag = 'Y'
      left join tb_mas_payment_type tmpt on tmpt.id = tc.cheque_payment_id  and tmpt.active_flag = 'Y'
      where tc.active_flag = 'Y' ORDER BY tc.id`;
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

// Task.getChequeById = function getChequeById(data, result) {
//     return new Promise(function (resolve, reject) {
//         var sql = "SELECT * FROM tb_invoice WHERE bill_no = '" + data.bill_no + "'";
//         client.query(sql, function (err, res) {
//             if (err) {
//                 const require = {
//                     data: [],
//                     error: err,
//                     query_result: false,
//                 };
//                 reject(require);
//             } else {
//                 const require = {
//                     data: res.rows,
//                     error: err,
//                     query_result: true,
//                 };
//                 resolve(require);
//             }
//         });
//         client.end;
//     });
// }

// Task.getBillByCustomer = function getBillByCustomer(data, result) {
//     return new Promise(function (resolve, reject) {
//         var sql = "SELECT * FROM tb_invoice WHERE customer_id = '" + data.customer_id + "'";
//         client.query(sql, function (err, res) {
//             if (err) {
//                 const require = {
//                     data: [],
//                     error: err,
//                     query_result: false,
//                 };
//                 reject(require);
//             } else {
//                 const require = {
//                     data: res.rows,
//                     error: err,
//                     query_result: true,
//                 };
//                 resolve(require);
//             }
//         });
//         client.end;
//     });
// }

// Task.getBillByDate = function getBillByDate(data, result) {
//     return new Promise(function (resolve, reject) {
//         var sql = "SELECT * FROM tb_invoice WHERE invoice_date BETWEEN '" + data.start_date + "' AND '" + data.end_date + "'";
//         client.query(sql, function (err, res) {
//             if (err) {
//                 const require = {
//                     data: [],
//                     error: err,
//                     query_result: false,
//                 };
//                 reject(require);
//             } else {
//                 const require = {
//                     data: res.rows,
//                     error: err,
//                     query_result: true,
//                 };
//                 resolve(require);
//             }
//         });
//         client.end;
//     });
// }

Task.createCheque = function createCheque(data, result) {
  // console.log('createBill :', data);

  return new Promise(function (resolve, reject) {
    var sql = `insert
	into
	tb_cheque
(
	bank_id,
	branch,
	cheque_number,
	payee_only,
	cheque_issue_date,
	cheque_clearance_date,
	cheque_payment_id,
	cheque_payment_remark,
	amount,
	create_by,
	update_by
)
values(
$1,
$2,
$3,
$4,
$5,
$6,
$7,
$8,
$9,
$10,
$11
)`;

    console.log("sql :", sql);
    client.query(
      sql,
      [
        data.bank,
        data.branch,
        data.checkNo,
        data.payeeOnly,
        data.issueDate,
        data.clearanceDate,
        data.chequePaymentType,
        data.paymentRemark,
        data.amount,
        'admin',
        'admin'
      ],
      function (err, res) {
        console.log(err);
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
      }
    );
    client.end;
  });
};

module.exports = Task;
