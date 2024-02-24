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
    console.log('data : ', data);
    return new Promise(function (resolve, reject) {
        var sql = "SELECT * FROM tb_users WHERE username = $1 AND password = $2 AND active_flag = 'Y'";
        client.query(sql, [data.username, data.password], function (err, res) {
            if (err) {
                const require = {
                    data: [],
                    error: err,
                    query_result: false,
                    status: 500,
                };
                reject(require);
            }
            else {
                if (res.rows.length == 0) {
                    const require = {
                        data: [],
                        error: 'username or password incorrect',
                        query_result: false,
                        status: 401,
                    };
                    reject(require);
                } else {
                    const token = jwt.sign({ username: data.username, password: data.password, active_flag: 'Y' }, 'secretkey here', { expiresIn: '1h' });
                    res.rows[0].token = token;
                    const require = {
                        data: res.rows,
                        error: err,
                        query_result: true,
                        status: 200,
                    };
                    resolve(require);
                }
            }
        });
        client.end;
    });
};

module.exports = Task;