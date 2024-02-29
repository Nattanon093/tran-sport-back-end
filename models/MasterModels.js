var client = require('./BaseModel');
var Task = function (task) {
    this.task = task.task;
};

Task.getMasterPaymentType = function (req, result) {
    return new Promise(function (resolve, reject) {
        var sql = "SELECT * FROM tb_mas_payment WHERE active_flag = 'Y' ORDER BY id";
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