var client = require('./BaseModel');
const axios = require('axios');

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


// Task.getDeliveryService = function getDeliveryService(data, result) {
//     let dataFrom = data[0].from;
//     let dataTo = data[0].to;
//     let dataParcel = data[0].parcel;
//     return new Promise(function (resolve, reject) {
//         let sql = `SELECT
//         from_province.id as from_province_id,
//         to_province.id as to_province_id
//         FROM tb_mas_province from_province
//         INNER JOIN tb_mas_province to_province ON from_province.name_th = $1 AND to_province.name_th = $2`;
//         let values = [dataFrom.province, dataTo.province];
//         client.query(sql, values, function (err, res) {
//             try {
//                 if (err) {
//                     reject(err);
//                 }
//                 if (!res || !res.rows || res.rows.length === 0) {
//                     reject(new Error('No results returned from the query'));
//                 } else {
//                     let values = []
//                     let queryPackageSize = "SELECT \n" +
//                         "package_size.id, \n" +
//                         "package_size.total_dimension, \n" +
//                         "package_size.weight \n" +
//                         "FROM package_size \n";

//                     queryPackageSize += " WHERE 1=1 \n";

//                     if (dataParcel.width && dataParcel.length && dataParcel.height) {
//                         let sum = (parseInt(dataParcel.width) + parseInt(dataParcel.length) + parseInt(dataParcel.height));
//                         queryPackageSize += " AND package_size.total_dimension >= $1 \n";
//                         values.push(sum);
//                     }
//                     if (dataParcel.package_size_id) {
//                         queryPackageSize += " AND package_size.id = $1 \n";
//                         values.push(dataParcel.package_size_id);
//                     }

//                     queryPackageSize += " ORDER BY package_size.total_dimension ASC";
//                     client.query(queryPackageSize, values, function (errPackageSize, resPackageSize) {
//                         try {
//                             if (errPackageSize) {
//                                 reject(errPackageSize);
//                             }
//                             if (!resPackageSize || !resPackageSize.rows || resPackageSize.rows.length === 0) {
//                                 reject(new Error('No results returned from the query'));
//                             } else {
//                                 let widthPackage = resPackageSize.rows[0].weight;
//                                 let dataProvince = res.rows;
//                                 let valuesPackageSize = [];
//                                 let query = "SELECT \n" +
//                                     "transportation_type.type_name, \n" +
//                                     "transportation_type.parcel_pickup_point, \n" +
//                                     "transportation_type.delivery_time, \n" +
//                                     "transportation_img.img_url, \n" +
//                                     "transportation_type_package_size.rate_bangkok_metro, \n" +
//                                     "transportation_type_package_size.rate_bangkok_metro_to_other_provinces \n" +
//                                     "FROM \n" +
//                                     "transportation_rate " +
//                                     "INNER JOIN transportation_type on \n" +
//                                     "transportation_rate.transportation_type_id = transportation_type.id \n" +
//                                     "INNER JOIN  transportation_img on \n" +
//                                     "transportation_type.transportation_img_id = transportation_img.id \n" +
//                                     "INNER JOIN  transportation_type_package_size on \n" +
//                                     "transportation_type.id = transportation_type_package_size.transportation_type_id \n" +
//                                     "INNER JOIN weigth on \n" +
//                                     "transportation_type_package_size.weigth_id = weigth.id \n";

//                                 query += " WHERE 1=1 \n";

//                                 if (widthPackage && dataParcel.weight) {
//                                     if (dataParcel.weight > widthPackage) {
//                                         query += " AND weigth.weigth = $1 \n";
//                                         valuesPackageSize.push(dataParcel.weight);
//                                     } else {
//                                         query += " AND weigth.weigth = $1 \n";
//                                         valuesPackageSize.push(parseInt(widthPackage));
//                                     }
//                                 }

//                                 if (!dataParcel.width && !dataParcel.length && !dataParcel.height && !dataParcel.id && !dataParcel.weight) {
//                                     query += " AND 1=1";
//                                 }

//                                 query += " AND transportation_type_package_size.is_active = true \n";

//                                 query += " GROUP BY " +
//                                     "transportation_type.type_name, \n" +
//                                     "transportation_type.parcel_pickup_point, \n" +
//                                     "transportation_type.delivery_time, \n" +
//                                     "transportation_img.img_url, \n" +
//                                     "transportation_type_package_size.rate_bangkok_metro, \n" +
//                                     "transportation_type_package_size.rate_bangkok_metro_to_other_provinces";
//                                 client.query(query, valuesPackageSize, function (err, res) {
//                                     try {
//                                         if (err) {
//                                             console.log('err :', err);
//                                             reject(err);
//                                         }
//                                         if (!res || !res.rows || res.rows.length === 0) {
//                                             reject(new Error('No results returned from the query'));
//                                         } else {
//                                             let dataTransportation = res.rows;
//                                             let isBangkokMetro = false;
//                                             let isOtherProvinces = false;
//                                             let dataDeliveryService = [];


//                                             let sql = `SELECT
//                                 from_province.id as from_province_id,
//                                 to_province.id as to_province_id,
//                                 mst_within_bangkok_metro.destination_province_id AS bangkok_metro,
//                                 mst_from_bangkok_metro_to_other_provinces.destination_province_id AS other_provinces
//                                 FROM tb_mas_province from_province
//                                 INNER JOIN tb_mas_province to_province ON from_province.id = $1 AND to_province.id = $2
//                                 LEFT JOIN mst_within_bangkok_metro ON from_province.id = mst_within_bangkok_metro.destination_province_id AND to_province.id = mst_within_bangkok_metro.destination_province_id
//                                 LEFT JOIN mst_from_bangkok_metro_to_other_provinces ON from_province.id = mst_from_bangkok_metro_to_other_provinces.destination_province_id AND to_province.id = mst_from_bangkok_metro_to_other_provinces.destination_province_id`;
//                                             let values = [dataProvince[0].to_province_id, dataProvince[0].to_province_id];
//                                             client.query(sql, values, function (err, res) {
//                                                 try {
//                                                     if (err) {
//                                                         console.log('err :', err);
//                                                         reject(err);
//                                                     }
//                                                     if (!res || !res.rows || res.rows.length === 0) {
//                                                         reject(new Error('No results returned from the query'));
//                                                     } else {
//                                                         isBangkokMetro = res.rows[0].bangkok_metro ? true : false;
//                                                         isOtherProvinces = res.rows[0].other_provinces ? true : false;

//                                                         for (let i = 0; i < dataTransportation.length; i++) {
//                                                             let data = dataTransportation[i];
//                                                             let rate = 0;
//                                                             if (isBangkokMetro) {
//                                                                 rate = data.rate_bangkok_metro;
//                                                             } else if (isOtherProvinces) {
//                                                                 rate = data.rate_bangkok_metro_to_other_provinces;
//                                                             }
//                                                             dataDeliveryService.push({
//                                                                 type_name: data.type_name,
//                                                                 parcel_pickup_point: data.parcel_pickup_point,
//                                                                 delivery_time: data.delivery_time,
//                                                                 img_url: data.img_url,
//                                                                 rate: rate
//                                                             });
//                                                         }
//                                                         dataDeliveryService.sort((a, b) => (a.rate > b.rate) ? 1 : -1);
//                                                         resolve(dataDeliveryService.length > 0 ? dataDeliveryService : res.rows);
//                                                     }
//                                                 } catch (error) {
//                                                     console.log('error :', error);
//                                                     reject(error);
//                                                 }
//                                             });
//                                         }
//                                     } catch (error) {
//                                         console.log('error :', error);
//                                         reject(error);
//                                     }
//                                 });
//                             }
//                         } catch (error) {
//                             console.log('error :', error);
//                             reject(error);
//                         }
//                     });
//                 }
//             } catch (error) {
//                 console.log('error :', error);
//                 reject(error);
//             }
//         });
//     });
// }

Task.getDeliveryService = function getDeliveryService(data, result) {
    let dataFrom = data[0].from;
    let dataTo = data[0].to;
    let dataParcel = data[0].parcel;
    return new Promise(function (resolve, reject) {
        let queryProvince = `SELECT
        from_province.id as from_province_id,
        to_province.id as to_province_id
        FROM tb_mas_province from_province
        INNER JOIN tb_mas_province to_province ON from_province.name_th = $1 AND to_province.name_th = $2`;
        let valuesProvince = [dataFrom.province, dataTo.province];
        client.query(queryProvince, valuesProvince, function (errProvince, resProvince) {
            try {
                if (errProvince) {
                    reject(errProvince);
                }
                if (!resProvince || !resProvince.rows || resProvince.rows.length === 0) {
                    reject(new Error('No results returned from the query'));
                } else {
                    let valuesParcelBox = []
                    let queryParcelBox = "SELECT \n" +
                        "parcel_box.id, \n" +
                        "parcel_box.size_to, \n" +
                        "parcel_box.weight_to \n" +
                        "FROM parcel_box \n" +
                        "WHERE 1=1 \n";
                    if (dataParcel.width && dataParcel.length && dataParcel.height) {
                        let sum = (parseInt(dataParcel.width) + parseInt(dataParcel.length) + parseInt(dataParcel.height));
                        queryParcelBox += ` AND parcel_box.size_to >= $${valuesParcelBox.length + 1} \n`;
                        valuesParcelBox.push(sum);
                    }
                    queryParcelBox += " ORDER BY parcel_box.size_to ASC";
                    client.query(queryParcelBox, valuesParcelBox, function (errParcelBox, resParcelBox) {
                        try {
                            if (errParcelBox) {
                                reject(errParcelBox);
                            }
                            if (!resParcelBox || !resParcelBox.rows || resParcelBox.rows.length === 0) {
                                reject(new Error('No results returned from the query'));
                            } else {
                                let weightTo = resParcelBox.rows[0].weight_to;
                                let dataProvince = resProvince.rows;
                                let valuesParcelBox = [];
                                let queryTransportation = "SELECT \n" +
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
                                    "INNER JOIN weigth on  \n" +
                                    "transportation_type_package_size.weigth_id = weigth.id \n"
                                    queryTransportation += " WHERE 1=1 \n";

                                if (weightTo && dataParcel.weight) {
                                    if (dataParcel.weight > weightTo) {
                                        queryTransportation += " AND weigth.weigth = $1 \n";
                                        valuesParcelBox.push(dataParcel.weight);
                                    } else {
                                        queryTransportation += " AND weigth.weigth = $1 \n";
                                        valuesParcelBox.push(parseInt(weightTo));
                                    }
                                }

                                if (!dataParcel.width && !dataParcel.length && !dataParcel.height && !dataParcel.id && !dataParcel.weight) {
                                    queryTransportation += " AND 1=1";
                                }

                                queryTransportation += " AND transportation_type_package_size.is_active = true \n";

                                queryTransportation += " GROUP BY " +
                                    "transportation_type.type_name, " +
                                    "transportation_type.parcel_pickup_point, " +
                                    "transportation_type.delivery_time, " +
                                    "transportation_img.img_url, " +
                                    "transportation_type_package_size.rate_bangkok_metro, " +
                                    "transportation_type_package_size.rate_bangkok_metro_to_other_provinces";
                                client.query(queryTransportation, valuesParcelBox, function (errTransportation, resTransportation) {
                                    try {
                                        if (errTransportation) {
                                            console.log('err :', errTransportation);
                                            reject(errTransportation);
                                        }
                                        if (!resTransportation || !resTransportation.rows || resTransportation.rows.length === 0) {
                                            reject(new Error('No results returned from the query'));
                                        } else {
                                            let dataTransportation = resTransportation.rows;
                                            let isBangkokMetro = false;
                                            let isOtherProvinces = false;
                                            let dataDeliveryService = [];

                                            let queryToProvince = `SELECT
                                                       from_province.id as from_province_id,
                                                       to_province.id as to_province_id,
                                                       mst_within_bangkok_metro.destination_province_id AS bangkok_metro,
                                                       mst_from_bangkok_metro_to_other_provinces.destination_province_id AS other_provinces
                                                       FROM tb_mas_province from_province
                                                       INNER JOIN tb_mas_province to_province ON from_province.id = $1 AND to_province.id = $2
                                                       LEFT JOIN mst_within_bangkok_metro ON from_province.id = mst_within_bangkok_metro.destination_province_id AND to_province.id = mst_within_bangkok_metro.destination_province_id
                                                       LEFT JOIN mst_from_bangkok_metro_to_other_provinces ON from_province.id = mst_from_bangkok_metro_to_other_provinces.destination_province_id AND to_province.id = mst_from_bangkok_metro_to_other_provinces.destination_province_id`;
                                            let values = [dataProvince[0].to_province_id, dataProvince[0].to_province_id];
                                            client.query(queryToProvince, values, function (err, res) {
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
                            reject(error);
                        }
                    });
                }
            } catch (error) {
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

Task.Tracking_CheckProvider = function Tracking_CheckProvider(data, result) {
    console.log('data :', data);
    return new Promise(function (resolve, reject) {
        let url = `http://bsxpress.co/Master/Tracking_CheckProvider?x=${data.x}`;
        axios.post(url)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}


module.exports = Task;