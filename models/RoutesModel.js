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
        from_province.id as from_province_id,
        to_province.id as to_province_id
        FROM tb_mas_province from_province
        INNER JOIN tb_mas_province to_province ON from_province.name_th = $1 AND to_province.name_th = $2`;
        let values = [dataFrom.province, dataTo.province];
        client.query(sql, values, function (err, res) {
            try {
                if (err) {
                    reject(err);
                }
                if (!res || !res.rows || res.rows.length === 0) {
                    reject(new Error('No results returned from the query'));
                } else {
                    let dataProvince = res.rows;
                    let valuesPackageSize = [];
                    let query = "SELECT \n" +
                        "transportation_type.type_name, \n" +
                        "transportation_type.parcel_pickup_point, \n" +
                        "transportation_type.delivery_time, \n" +
                        "transportation_img.img_url, \n" +
                        "transportation_type_package_size.rate_bangkok_metro, \n" +
                        "transportation_type_package_size.rate_bangkok_metro_to_other_provinces \n" +
                        "FROM \n" +
                        "transportation_rate " +
                        "INNER JOIN transportation_type on \n" +
                        "transportation_rate.transportation_type_id = transportation_type.id \n" +
                        "INNER JOIN  transportation_img on \n" +
                        "transportation_type.transportation_img_id = transportation_img.id \n" +
                        "INNER JOIN  transportation_type_package_size on \n" +
                        "transportation_type.id = transportation_type_package_size.transportation_type_id \n" +
                        "INNER JOIN weigth on \n" +
                        "transportation_type_package_size.weigth_id = weigth.id \n";

                    query += " WHERE 1=1 \n";

                    // if (dataParcel.width) {
                    //     query += " AND package_size.width >= ? \n";
                    //     valuesPackageSize.push(dataParcel.width);
                    // }
                    // if (dataParcel.length) {
                    //     query += " AND package_size.length >= ? \n";
                    //     valuesPackageSize.push(dataParcel.length);
                    // }
                    // if (dataParcel.height) {
                    //     query += " AND package_size.height >= ? \n";
                    //     valuesPackageSize.push(dataParcel.height);
                    // }
                    // if (dataParcel.id) {
                    //     query += " AND package_size.id = $1 \n";
                    //     valuesPackageSize.push(dataParcel.id);
                    // }
                    if (dataParcel.weight) {
                        query += " AND weigth.weigth = $1 \n";
                        valuesPackageSize.push(dataParcel.weight);
                    }

                    if (!dataParcel.width && !dataParcel.length && !dataParcel.height && !dataParcel.id && !dataParcel.weight) {
                        query += " AND 1=1";
                    }

                    query += " AND transportation_type_package_size.is_active = true \n";

                    query += " GROUP BY " +
                        "transportation_type.type_name, \n" +
                        "transportation_type.parcel_pickup_point, \n" +
                        "transportation_type.delivery_time, \n" +
                        "transportation_img.img_url, \n" +
                        "transportation_type_package_size.rate_bangkok_metro, \n" +
                        "transportation_type_package_size.rate_bangkok_metro_to_other_provinces";
                    client.query(query, valuesPackageSize, function (err, res) {
                        try {
                            if (err) {
                                console.log('err :', err);
                                reject(err);
                            }
                            if (!res || !res.rows || res.rows.length === 0) {
                                reject(new Error('No results returned from the query'));
                            } else {
                                let dataTransportation = res.rows;
                                let isBangkokMetro = false;
                                let isOtherProvinces = false;
                                let dataDeliveryService = [];


                                let sql = `SELECT
                                from_province.id as from_province_id,
                                to_province.id as to_province_id,
                                mst_within_bangkok_metro.destination_province_id AS bangkok_metro,
                                mst_from_bangkok_metro_to_other_provinces.destination_province_id AS other_provinces
                                FROM tb_mas_province from_province
                                INNER JOIN tb_mas_province to_province ON from_province.id = $1 AND to_province.id = $2
                                LEFT JOIN mst_within_bangkok_metro ON from_province.id = mst_within_bangkok_metro.destination_province_id AND to_province.id = mst_within_bangkok_metro.destination_province_id
                                LEFT JOIN mst_from_bangkok_metro_to_other_provinces ON from_province.id = mst_from_bangkok_metro_to_other_provinces.destination_province_id AND to_province.id = mst_from_bangkok_metro_to_other_provinces.destination_province_id`;
                                let values = [dataProvince[0].to_province_id, dataProvince[0].to_province_id];
                                client.query(sql, values, function (err, res) {
                                    try {
                                        if (err) {
                                            console.log('err :', err);
                                            reject(err);
                                        }
                                        if (!res || !res.rows || res.rows.length === 0) {
                                            reject(new Error('No results returned from the query'));
                                        } else {
                                            isBangkokMetro = res.rows[0].bangkok_metro ? true : false;
                                            isOtherProvinces = res.rows[0].other_provinces ? true : false;

                                            for (let i = 0; i < dataTransportation.length; i++) {
                                                let data = dataTransportation[i];
                                                let rate = 0;
                                                if (isBangkokMetro) {
                                                    rate = data.rate_bangkok_metro;
                                                } else if (isOtherProvinces) {
                                                    rate = data.rate_bangkok_metro_to_other_provinces;
                                                }
                                                dataDeliveryService.push({
                                                    type_name: data.type_name,
                                                    parcel_pickup_point: data.parcel_pickup_point,
                                                    delivery_time: data.delivery_time,
                                                    img_url: data.img_url,
                                                    rate: rate
                                                });
                                            }
                                            dataDeliveryService.sort((a, b) => (a.rate > b.rate) ? 1 : -1);
                                            resolve(dataDeliveryService.length > 0 ? dataDeliveryService : res.rows);
                                        }
                                    } catch (error) {
                                        console.log('error :', error);
                                        reject(error);
                                    }
                                });
                            }
                        } catch (error) {
                            console.log('error :', error);
                            reject(error);
                        }
                    });
                }
            } catch (error) {
                console.log('error :', error);
                reject(error);
            }
        });
    });
}

Task.getParcelBoxSize = function getParcelBoxSize(data, result) {
    return new Promise(function (resolve, reject) {
        let sql = `SELECT 
        id,
        size_name
        FROM package_size`;
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


module.exports = Task;