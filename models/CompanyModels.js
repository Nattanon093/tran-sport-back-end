var client = require('./BaseModel');
var Task = function (task) {
    this.task = task.task;
};

Task.getCompany = function getCompany(data, result) {
    return new Promise(function (resolve, reject) {
        var sql = "SELECT id, company_name FROM tb_company WHERE active_flag = 'Y'";
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