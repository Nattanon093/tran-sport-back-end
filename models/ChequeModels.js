var client = require("./BaseModel");
var Task = function (task) {
  this.task = task.task;
};

Task.getCheque = function getCheque(data, result) {
  return new Promise(function (resolve, reject) {
    var sql =
    `select
    tc.id as id,
    tmb.bank_name as bank_name,
    tmb.short_code as short_code,
    tc.cheque_number as cheque_number ,
    tc.payee_only as payee_only ,
    tc.cheque_issue_date as cheque_issue_date,
    tc.cheque_clearance_date as cheque_clearance_date,
    tc.cheque_payment_remark as cheque_payment_remark,
    tc.amount as amount,
    tmpt.payment_type_name as payment_type_name,
    tmcs.status_name as status_name,
    tmcs.id as status_id,
    tc.active_flag as active_flag
    from tb_cheque tc 
    left join tb_mas_bank tmb on tmb.id = tc.bank_id and tmb.active_flag = 'Y'
    left join tb_mas_payment_type tmpt on tmpt.id = tc.cheque_payment_id  and tmpt.active_flag = 'Y'
    left join tb_mas_cheque_status tmcs on tmcs.id = tc.cheque_status_id and tmcs.active_flag = 'Y'
    where tc.active_flag = 'Y' ORDER BY tc.update_date desc`;
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

Task.createCheque = function createCheque(data, result) {

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
	update_by,
  cheque_status_id
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
$11,
$12
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
        'admin',
        1
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

Task.updateCheque = function updateCheque(data) {
  return new Promise(function (resolve, reject) {
    var sql = `update
    tb_cheque
  set
    update_by = 'admin',
    update_date = CURRENT_TIMESTAMP,
    cheque_status_id = $1
  where
    id = $2`;

    client.query(sql,[
      data.status_id,
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
  })
}

Task.deleteCheque = function deleteCheque(data, result) {
  console.log("data", data)
  return new Promise(function (resolve, reject) {
    var sql =
    `DELETE FROM tb_cheque
    WHERE id=$1`;
    client.query(sql,[
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
};


module.exports = Task;
