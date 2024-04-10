var client = require("./BaseModel");
var Task = function (task) {
  this.task = task.task;
};

Task.getExpense = function getExpense(data, result) {
  return new Promise(function (resolve, reject) {
    var sql = `select
	id,
	expense_name,
	amount,
	remark,
	create_by,
	create_date,
	update_by,
	update_date,
	active_flag
from
	tb_expense
where
	active_flag = 'Y'
order by
	update_date desc`;

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
    create_by,
    update_by
  )
  values(
  $1,
  $2,
  $3,
  $4,
  $5
  )`;

    console.log("sql :", sql);
    client.query(
      sql,
      [
        data.expenseName,
        data.amount,
        data.expenseRemark,
        "admin",
        "admin"
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