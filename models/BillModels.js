var client = require('./BaseModel');
var Task = function (task) {
    this.task = task.task;
};

Task.generateBillNo = function generateBillNo(data, result) {
    return new Promise(function (resolve, reject) {
        var sql = "SELECT * FROM tb_invoice";
        client.query(sql, function (err, res) {
            let bill_no = '';
            if (res.rowCount > 0) {
                let last_bill_no = res.rows[0].bill_no;
                let last_year = last_bill_no.substring(0, 2);
                let last_no = last_bill_no.substring(2, 8);
                let current_year_th = new Date().getFullYear() + 543;
                let current_year = current_year_th.toString().substring(2, 4);
                if (current_year == last_year) {
                    let new_no = parseInt(last_no) + 1;
                    bill_no = current_year + new_no.toString().padStart(6, '0');
                } else {
                    bill_no = current_year + '000001';
                }
            } else {
                let current_year_th = new Date().getFullYear() + 543;
                bill_no = current_year_th.toString().substring(2, 4) + '000001';
            }

            const require = {
                data: bill_no,
                error: err,
                query_result: true,
            };
            resolve(require);
        });
        client.end;
    });
}


module.exports = Task;