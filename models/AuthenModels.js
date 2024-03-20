var client = require('./BaseModel');
var jwt = require('jsonwebtoken');
var Task = function (task) {
    this.task = task.task;
};

Task.getAuthen = function getAuthen(result) {
    return new Promise(function (resolve, reject) {
        var sql = "SELECT * FROM tb_users";
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

Task.login = function login(data, result) {
    return new Promise(function (resolve, reject) {
        var sql = "SELECT * FROM tb_users WHERE username = $1 AND password = $2 AND active_flag = 'Y'";
        client.query(sql, [data.username, data.password], function (err, res) {
            console.log('res.rows', res.rows);
            console.log('err', err);
            if (err) {
                const require = {
                    data: [],
                    error: err,
                    query_result: false,
                };
                reject(require);
            } else {
                if (res.rows.length > 0) {
                    const token = jwt.sign({ username: data.username }, 'secret key');
                    const require = {
                        data: res.rows,
                        error: err,
                        query_result: true,
                        token: token
                    };
                    resolve(require);
                }
                else {
                    const require = {
                        data: [],
                        error: err,
                        query_result: false,
                    };
                    reject(require);
                }
            }
        });
        client.end;
    });
};

Task.refreshToken = function refreshToken(data, result) {
    console.log('data', data);
    return new Promise(function (resolve, reject) {
        var sql = "SELECT * FROM tb_users WHERE username = $1 AND active_flag = 'Y'";
        client.query(sql, [data.username], function (err, res) {
            console.log('res.rows', res.rows);
            console.log('err', err);
            if (err) {
                const require = {
                    data: [],
                    error: err,
                    query_result: false,
                };
                reject(require);
            } else {
                if (res.rows.length > 0) {
                    const token = jwt.sign({ username: data.username }, 'secret key');
                    const require = {
                        data: res.rows,
                        error: err,
                        query_result: true,
                        token: token
                    };
                    resolve(require);
                }
                else {
                    const require = {
                        data: [],
                        error: err,
                        query_result: false,
                    };
                    reject(require);
                }
            }
        });
        client.end;
    });
};

module.exports = Task;