var client = require("./BaseModel");
var Task = function (task) {
  this.task = task.task;
};

Task.getExpense = function getExpense(data, result) {
  return new Promise(function (resolve, reject) {
    var sql = `select
	te.id,
	te.expense_name,
	te.amount,
	te.remark,
	te.expense_type_id,
	tmet.expense_type_name,
	te.create_by,
	te.create_date,
	te.update_by,
	te.update_date,
	te.active_flag
from
	tb_expense te
left join tb_mas_expense_type tmet on tmet.id = te.expense_type_id and tmet.active_flag = 'Y'
where te.active_flag = 'Y'
order by te.update_date desc`;

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

Task.createExpense = function createExpense(data, result) {
  return new Promise(function (resolve, reject) {
    var sql = `insert
      into
      tb_expense
  (
    expense_name,
    amount,
    remark,
    expense_type_id,
    create_by,
    update_by
  )
  values(
  $1,
  $2,
  $3,
  $4,
  $5,
  $6
  )`;

    console.log("sql :", sql);
    client.query(
      sql,
      [
        data.expenseName,
        data.amount,
        data.expenseRemark,
        data.expenseType,
        "admin",
        "admin",
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
