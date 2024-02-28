var client = require('./BaseModel');
var jwt = require('jsonwebtoken');
var Task = function (task) {
    this.task = task.task;
};

Task.getStock = function getStock(data, result) {
    return new Promise(function (resolve, reject) {
        var sql = "SELECT * FROM tb_stock";
        client.query(sql, function (err, res) {
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