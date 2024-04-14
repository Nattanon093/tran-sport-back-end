var client = require("./BaseModel");
var Task = function (task) {
  this.task = task.task;
};

Task.getMasterPaymentType = function (req, result) {
  return new Promise(function (resolve, reject) {
    var sql =
      "SELECT * FROM tb_mas_payment WHERE active_flag = 'Y' ORDER BY id";
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
          data: res?.rows,
          error: err,
          query_result: true,
        };
        resolve(require);
      }
    });
    client.end;
  });
};

Task.getMasterBank = function (req, result) {
  return new Promise(function (resolve, reject) {
    var sql =
      "SELECT id, bank_name,short_code, active_flag FROM tb_mas_bank WHERE active_flag = 'Y' ORDER BY id";
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
          data: res?.rows,
          error: err,
          query_result: true,
        };
        resolve(require);
      }
    });
    client.end;
  });
};

Task.getMasterChequePaymentType = function (req, result) {
  return new Promise(function (resolve, reject) {
    var sql =
      "select id, payment_type_name as name, active_flag  from tb_mas_payment_type where active_flag = 'Y' ORDER BY id";
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
          data: res?.rows,
          error: err,
          query_result: true,
        };
        resolve(require);
      }
    });
    client.end;
  });
};

Task.getMasterDocument = function (req, result) {
  return new Promise(function (resolve, reject) {
    var sql = `select
        tm.id as id,
        tm.document_name as document_name,
        tm.create_by,
        tm.create_date,
        tm.update_by,
        tm.update_date,
        tm.active_flag
    from
        tb_mas_document tm
    where
        tm.active_flag = 'Y'
    order by
        tm.id `;
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
          data: res?.rows,
          error: err,
          query_result: true,
        };
        resolve(require);
      }
    });
    client.end;
  });
};

Task.getMasterChequeStatus = function (req, result) {
  return new Promise(function (resolve, reject) {
    var sql = `select
    id,
    status_name as name,
    active_flag
  from
    tb_mas_cheque_status
  where
    active_flag = 'Y'
  order by
    id`;
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
          data: res?.rows,
          error: err,
          query_result: true,
        };
        resolve(require);
      }
    });
    client.end;
  });
};

Task.getMasterExpenseType = function (req, result) {
  return new Promise(function (resolve, reject) {
    var sql = `select
    id,
    expense_type_name as name,
    active_flag
  from
    tb_mas_expense_type
  where active_flag = 'Y'
  order by id`;
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
          data: res?.rows,
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
