var client = require('./BaseModel');

var Task = function (task) {
    this.task = task.task;
};

Task.getAuthen = function getAuthen(result) {
    return new Promise(function (resolve, reject) {
        var sql = "SELECT * FROM tb_users";
        client.query(sql, function (err, res) {
            console.log('err : ', err);
            console.log('res : ', res.rows);
            if (err) {
                console.log("error: ", err);
                const require = {
                    data: [],
                    error: err,
                    query_result: false,
                };
                reject(require);
            }
            else {
                console.log('tasks : ', res.rows);
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
        var sql = "SELECT * FROM tb_users WHERE username = $1 AND password = $2";
        client.query(sql, [data.username, data.password], function (err, res) {
            console.log('err : ', err);
            console.log('res : ', res.rows);
            if (err) {
                console.log("error: ", err);
                const require = {
                    data: [],
                    error: err,
                    query_result: false,
                };
                reject(require);
            }
            else {
                console.log('tasks : ', res.rows);
                // generate token here and send it back to client to store in local storage
                

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