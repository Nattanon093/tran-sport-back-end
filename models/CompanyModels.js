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

Task.getCompanyById = function getCompanyById(data, result) {
    return new Promise(function (resolve, reject) {
        var sql = `
        SELECT 
        tb_company.id,
        tb_company.company_name,
        tb_company.company_number,
        tb_company.village,
        tb_company.road,
        tb_company.email,
        tb_company.mobile_no,
        tb_mas_province.name_th AS province_name,
        tb_mas_district.name_th AS district_name,
        tb_mas_subdistrict.name_th AS sub_district_name,
        tb_company.zip_code
        FROM tb_company
        LEFT JOIN tb_mas_province ON tb_company.province_id = tb_mas_province.id
        LEFT JOIN tb_mas_district ON tb_company.district_id = tb_mas_district.id
        LEFT JOIN tb_mas_subdistrict ON tb_company.subdistrict_id = tb_mas_subdistrict.id
        WHERE tb_company.id = $1`;
        client.query(sql, [data.id], function (err, res) {
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