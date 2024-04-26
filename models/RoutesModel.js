var client = require('./BaseModel');
var Task = function (task) {
    this.task = task.task;
};

Task.getProvinceAndDistrictAndSubDistrict = function getProvinceAndDistrictAndSubDistrict(data, result) {
    return new Promise(function (resolve, reject) {
        let sql = `SELECT 
        row_number() over() as id,
        province.name_th || ' ' || district.name_th || ' ' ||sub_district.name_th || ' ' || sub_district.code  as name
        FROM tb_mas_province province
        INNER JOIN tb_mas_district district ON province.id = district.province_id
        INNER JOIN tb_mas_subdistrict sub_district ON district.id = sub_district.district_id
        ORDER BY id ASC`;
        client.query(sql, function (err, res) {
            try {
                if (err) {
                    reject(err);
                }
                resolve(res.rows);
            } catch (error) {
                reject(error);
            }
        });
        client.end;
    });
}


Task.getDeliveryService = function getDeliveryService(data, result) {
    let dataFrom = data[0].from;
    let dataTo = data[0].to;
    let dataParcel = data[0].parcel;
    return new Promise(function (resolve, reject) {
        let sql = `SELECT
        from_subdistrict.id as from_subdistrict_id,
        to_subdistrict.id as to_subdistrict_id
        FROM tb_mas_subdistrict from_subdistrict 
        INNER JOIN tb_mas_subdistrict to_subdistrict ON from_subdistrict.name_th = $1 AND to_subdistrict.name_th = $2`;
        let values = [dataFrom.sub_district, dataTo.sub_district];
        client.query(sql, values, function (err, res) {
            try {
                if (err) {
                    reject(err);
                }
                let sql = `SELECT mas_t.transport_name, mas_img_t.img_url ,mas_t.parcel_pickup_point, sp.price, dt.delivery_time
                FROM tb_mas_distances distances
                INNER JOIN tb_mas_transport mas_t ON distances.transport_id = mas_t.id
                INNER JOIN tb_mas_img_transport mas_img_t ON mas_t.id = mas_img_t.transport_id
                INNER JOIN tb_parcel_size mas_ps ON mas_t.id = mas_ps.transport_id
                INNER JOIN tb_shipping_price sp ON mas_ps.shipping_price_id = sp.id 
                INNER JOIN tb_delivery_time dt ON distances.delivery_time_id = dt.id
                WHERE distances.from_subdistrict_id = $1 AND distances.to_subdistrict_id = $2
                AND mas_ps.height >= $3 AND mas_ps.long >= $4 AND mas_ps.width >= $5 AND mas_ps.weight >= $6
                ORDER BY sp.price ASC`;
                let values = [res.rows[0].from_subdistrict_id, res.rows[0].to_subdistrict_id, dataParcel.height, dataParcel.length, dataParcel.width, dataParcel.weight];
                client.query(sql, values, function (err, res) {
                    try {
                        if (err) {
                            reject(err);
                        }
                        resolve(res.rows);
                    } catch (error) {
                        console.log('error :', error);
                        reject(error);
                    }
                });
            } catch (error) {
                console.log('error :', error);
                reject(error);
            }
        });
    });
}


module.exports = Task;