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

Task.getDeliveryService = async function getDeliveryService(data) {
    try {
        const { from, to, parcel } = data[0];
        const provinceIds = await getProvinceIds(from.province, to.province);
        const transportationTypes = await getActiveTransportationTypes();
        const parcelBoxes = await getParcelBoxes(parcel, transportationTypes);
        const transportationOptions = await getTransportationOptions(parcel, parcelBoxes, provinceIds);
        const deliveryServices = await getDeliveryServices(transportationOptions, provinceIds);
        return deliveryServices.length > 0 ? deliveryServices : [];
    } catch (error) {
        console.error('Error in getDeliveryService:', error);
        throw error; // Rethrow the error to be handled by the caller
    }
};

async function getProvinceIds(fromProvince, toProvince) {
    const query = `SELECT
        from_province.id as from_province_id,
        to_province.id as to_province_id
        FROM tb_mas_province from_province
        INNER JOIN tb_mas_province to_province ON from_province.name_th = $1 AND to_province.name_th = $2`;
    const values = [fromProvince, toProvince];
    const res = await client.query(query, values);
    if (!res.rows || res.rows.length === 0) throw new Error('No province IDs found');
    return res.rows[0];
}

async function getActiveTransportationTypes() {
    const query = "SELECT id FROM transportation_type WHERE is_active = true";
    const res = await client.query(query);
    if (!res.rows || res.rows.length === 0) throw new Error('No active transportation types found');
    return res.rows;
}

async function getParcelBoxes(parcel, transportationTypes) {
    const parcelBoxes = [];
    for (const transportationType of transportationTypes) {
        const values = [transportationType.id];
        let query = "SELECT \n" +
            "parcel_box.id, \n" +
            "parcel_box.type_transportation_id, \n" +
            "parcel_box.size_to, \n" +
            "parcel_box.weight_to \n" +
            "FROM parcel_box \n" +
            "WHERE 1=1 \n";

        if (transportationType.id) {
            query += " AND parcel_box.type_transportation_id = $1 \n";
            // Removed the duplicate push to avoid confusion with parameter indices
        }

        if (parcel.width && parcel.length && parcel.height) {
            const sum = (parseInt(parcel.width) + parseInt(parcel.length) + parseInt(parcel.height));
            query += ` AND parcel_box.size_to >= $${values.length + 1}::INTEGER \n`;
            values.push(sum);
        }

        query += " ORDER BY parcel_box.size_to ASC";
        try {
            const res = await client.query(query, values);
            if (!res.rows || res.rows.length === 0) {
                // Consider handling this case without throwing an error
                console.log('No parcel boxes found for:', values);
                continue; // Skip to the next iteration instead of throwing an error
            }
            parcelBoxes.push(res.rows[0]);
        } catch (error) {
            console.error('Error executing query:', error);
            // Handle or log the error appropriately
        }

        // After loop completion
        if (parcelBoxes.length === 0) {
            console.log('No matching parcel boxes found for any transportation type.');
            // Handle this scenario appropriately
        }
    }
    return parcelBoxes;
}

// // async function getTransportationOptions(parcel, parcelBoxes, provinceIds) {
// //     const transportationOptions = [];
// //     for (const parcelBox of parcelBoxes) {
// //         const weightTo = parcelBox.weight_to;
// //         const typeTransportationId = parcelBox.type_transportation_id;
// //         // Ensure correct province ID parameters are used by directly using them in the values array
// //         const values = [
// //             parseInt(provinceIds.from_province_id, 10), // $1
// //             parseInt(provinceIds.to_province_id, 10), // $2
// //             parseInt(typeTransportationId, 10) // $3
// //         ];
// //         let query = `SELECT 
// //             transportation_type.type_name, 
// //             transportation_type.parcel_pickup_point, 
// //             transportation_type.delivery_time, 
// //             transportation_img.img_url, 
// //             transportation_type_package_size.rate_bangkok_metro, 
// //             transportation_type_package_size.rate_bangkok_metro_to_other_provinces 
// //             FROM 
// //             transportation_rate 
// //             INNER JOIN transportation_type ON transportation_rate.transportation_type_id = transportation_type.id 
// //             INNER JOIN transportation_img ON transportation_type.transportation_img_id = transportation_img.id 
// //             INNER JOIN transportation_type_package_size ON transportation_type.id = transportation_type_package_size.transportation_type_id 
// //             INNER JOIN weigth ON transportation_type_package_size.weigth_id = weigth.id`; // Corrected typo in JOIN clause and variable name

// //         query += " WHERE 1=1 ";

// //         if (weightTo && parcel.weight) {
// //             const weightCondition = parcel.weight > weightTo ? parseInt(parcel.weight, 10) : parseInt(weightTo, 10);
// //             query += ` AND weigth.weigth <= $${values.length + 1}::integer `;
// //             values.push(weightCondition);
// //         }

// //         // Removed the incorrect replacement lines as values are now correctly used in the query

// //         query += " AND transportation_type_package_size.is_active = true ";

// //         query += " GROUP BY transportation_type.type_name, transportation_type.parcel_pickup_point, transportation_type.delivery_time, transportation_img.img_url, transportation_type_package_size.rate_bangkok_metro, transportation_type_package_size.rate_bangkok_metro_to_other_provinces";

// //         console.log("Final Query:", query);
// //         console.log("Values:", values);

// //         try {
// //             const res = await client.query(query, values);
// //             if (!res.rows || res.rows.length === 0) {
// //                 console.log('No transportation options found for:', values);
// //                 continue;
// //             }
// //             transportationOptions.push(res.rows);
// //         } catch (error) {
// //             console.error('Error executing query:', error);
// //         }
// //     }
// //     return transportationOptions;
// // }

async function getTransportationOptions(parcel, parcelBoxes, provinceIds) {
    const transportationOptions = [];
    for (const parcelBox of parcelBoxes) {
        const weightTo = parcelBox.weight_to;
        const typeTransportationId = parcelBox.type_transportation_id;
        // Ensure correct province ID parameters are used by directly using them in the values array
        const values = [
            parseInt(provinceIds.from_province_id, 10), // $1
            parseInt(provinceIds.to_province_id, 10), // $2
            parseInt(typeTransportationId, 10) // $3
        ];
        let query = `SELECT 
            transportation_type.type_name, 
            transportation_type.parcel_pickup_point, 
            transportation_type.delivery_time, 
            transportation_img.img_url, 
            transportation_type_package_size.rate_bangkok_metro, 
            transportation_type_package_size.rate_bangkok_metro_to_other_provinces ,
            from_province.id as from_province_id,
            to_province.id as to_province_id,
            mst_within_bangkok_metro.destination_province_id AS bangkok_metro,
            mst_from_bangkok_metro_to_other_provinces.destination_province_id AS other_provinces
            FROM 
            transportation_rate 
            INNER JOIN transportation_type ON transportation_rate.transportation_type_id = transportation_type.id 
            INNER JOIN transportation_img ON transportation_type.transportation_img_id = transportation_img.id 
            INNER JOIN transportation_type_package_size ON transportation_type.id = transportation_type_package_size.transportation_type_id 
            INNER JOIN weigth ON transportation_type_package_size.weigth_id = weigth.id 
            INNER JOIN tb_mas_province from_province ON from_province.id = $1
            INNER JOIN tb_mas_province to_province ON from_province.id = $1 AND to_province.id = $2
            LEFT JOIN mst_within_bangkok_metro ON from_province.id = mst_within_bangkok_metro.destination_province_id AND to_province.id = mst_within_bangkok_metro.destination_province_id
            LEFT JOIN mst_from_bangkok_metro_to_other_provinces ON from_province.id = mst_from_bangkok_metro_to_other_provinces.destination_province_id AND to_province.id = mst_from_bangkok_metro_to_other_provinces.destination_province_id
            WHERE 1=1 
            AND transportation_type.id = $3 `; // Corrected typo in JOIN clause and variable name

        if (weightTo && parcel.weight) {
            const weightCondition = Math.max(parcel.weight, weightTo);
            console.log('weightCondition :', weightCondition);
            query += ` AND weigth.weigth = $4::integer `;
            values.push(weightCondition);
        }

        query += " AND transportation_type_package_size.is_active = true ";

        query += " GROUP BY transportation_type.type_name, transportation_type.parcel_pickup_point, transportation_type.delivery_time, transportation_img.img_url, transportation_type_package_size.rate_bangkok_metro, transportation_type_package_size.rate_bangkok_metro_to_other_provinces, from_province.id, to_province.id, mst_within_bangkok_metro.destination_province_id, mst_from_bangkok_metro_to_other_provinces.destination_province_id";
        try {
            const res = await client.query(query, values);
            if (!res.rows || res.rows.length === 0) {
                console.log('No transportation options found for:', values);
                continue;
            }
            transportationOptions.push(res.rows);
        } catch (error) {
            console.error('Error executing query:', error);
        }
    }
    return transportationOptions;
}


async function getDeliveryServices(transportationOptions, provinceIds) {
    const deliveryServices = [];
    for (const dataTransportation of transportationOptions) {

        // const isOtherProvinces = false;
        const dataDeliveryService = [];
        for (const data of dataTransportation) {
            const isBangkokMetro = data.bangkok_metro ? true : false;
            let rate = 0;
            if (isBangkokMetro) {
                rate = data.rate_bangkok_metro;
            } else {
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
        deliveryServices.push(dataDeliveryService);
    }
    return deliveryServices;
}


// async function getTransportationOptions(parcel, parcelBoxes, provinceIds) {
//     const transportationOptions = [];
//     for (const parcelBox of parcelBoxes) {
//         const weightTo = parcelBox.weight_to;
//         const typeTransportationId = parcelBox.type_transportation_id;
//         const values = [provinceIds.to_province_id, provinceIds.to_province_id, typeTransportationId];
//         let query = "SELECT \n" +
//             "transportation_type.type_name, \n" +
//             "transportation_type.parcel_pickup_point, \n" +
//             "transportation_type.delivery_time, \n" +
//             "transportation_img.img_url, \n" +
//             "transportation_type_package_size.rate_bangkok_metro, \n" +
//             "transportation_type_package_size.rate_bangkok_metro_to_other_provinces \n" +
//             "FROM \n" +
//             "transportation_rate " +
//             "INNER JOIN transportation_type on \n" +
//             "transportation_rate.transportation_type_id = transportation_type.id \n" +
//             "INNER JOIN  transportation_img on \n" +
//             "transportation_type.transportation_img_id = transportation_img.id \n" +
//             "INNER JOIN  transportation_type_package_size on \n" +
//             "transportation_type.id = transportation_type_package_size.transportation_type_id \n" +
//             "INNER JOIN weigth on \n" + // Corrected the typo here from "weigth" to "weight"
//             "transportation_type_package_size.weigth_id = weigth.id \n";

//         query += " WHERE 1=1 \n";

//         if (weightTo && parcel.weight) {
//             if (parcel.weight > weightTo) {
//                 query += ` AND weigth.weigth = $${values.length + 1}::integer \n`;
//                 values.push(parseInt(parcel.weight));
//             } else {
//                 query += ` AND weigth.weigth = $${values.length + 1}::integer \n`;
//                 values.push(parseInt(weightTo));
//             }
//         }

//         if (!parcel.width && !parcel.length && !parcel.height && !parcel.id && !parcel.weight) {
//             query += " AND 1=1";
//         }

//         query += " AND transportation_type_package_size.is_active = true \n";

//         query += " GROUP BY " +
//             "transportation_type.type_name, " +
//             "transportation_type.parcel_pickup_point, " +
//             "transportation_type.delivery_time, " +
//             "transportation_img.img_url, " +
//             "transportation_type_package_size.rate_bangkok_metro, " +
//             "transportation_type_package_size.rate_bangkok_metro_to_other_provinces";

//         console.log("Final Query:", query);
//         console.log("Values:", values);

//         try {   
//             const res = await client.query(query, values);
//             if (!res.rows || res.rows.length === 0) {
//                 // Consider handling this case without throwing an error
//                 console.log('No transportation options found for:', values);
//                 continue; // Skip to the next iteration instead of throwing an error
//             }
//             transportationOptions.push(res.rows);
//         }
//         catch (error) {
//             console.error('Error executing query:', error);
//             // Handle or log the error appropriately
//         }

//         // After loop completion
//         if (transportationOptions.length === 0) {
//             console.log('No matching transportation options found for any parcel box.');
//             // Handle this scenario appropriately
//         }
//     }
//     return transportationOptions;
// }

// Task.getDeliveryService = function getDeliveryService(data, result) {
//     let dataFrom = data[0].from;
//     let dataTo = data[0].to;
//     let dataParcel = data[0].parcel;
//     return new Promise(function (resolve, reject) {
//         let queryProvince = `SELECT
//         from_province.id as from_province_id,
//         to_province.id as to_province_id
//         FROM tb_mas_province from_province
//         INNER JOIN tb_mas_province to_province ON from_province.name_th = $1 AND to_province.name_th = $2`;
//         let valuesProvince = [dataFrom.province, dataTo.province];
//         client.query(queryProvince, valuesProvince, function (errProvince, resProvince) {
//             try {
//                 if (errProvince) {
//                     reject(errProvince);
//                 }
//                 if (!resProvince || !resProvince.rows || resProvince.rows.length === 0) {
//                     reject(new Error('No results returned from the query'));
//                 } else {
//                     let queryTransportationType = "SELECT id FROM transportation_type WHERE is_active = true";
//                     client.query(queryTransportationType, function (errTransportationType, resTransportationType) {
//                         try {
//                             if (errTransportationType) {
//                                 reject(errTransportationType);
//                             }
//                             if (!resTransportationType || !resTransportationType.rows || resTransportationType.rows.length === 0) {
//                                 reject(new Error('No results returned from the query'));
//                             } else {

//                                 let transportationType = resTransportationType.rows;
//                                 // let dataDeliveryService = [];
//                                 transportationType.forEach((element, index) => {
//                                     let valuesParcelBox = []
//                                     let queryParcelBox = "SELECT \n" +
//                                         "parcel_box.id, \n" +
//                                         "parcel_box.type_transportation_id, \n" +
//                                         "parcel_box.size_to, \n" +
//                                         "parcel_box.weight_to \n" +
//                                         "FROM parcel_box \n" +
//                                         "WHERE 1=1 \n";

//                                     if (element.id) {
//                                         queryParcelBox += " AND parcel_box.type_transportation_id = $1 \n";
//                                         valuesParcelBox.push(element.id);
//                                     }
//                                     if (dataParcel.width && dataParcel.length && dataParcel.height) {
//                                         let sum = (parseInt(dataParcel.width) + parseInt(dataParcel.length) + parseInt(dataParcel.height));
//                                         queryParcelBox += ` AND parcel_box.size_to >= $${valuesParcelBox.length + 1} \n`;
//                                         valuesParcelBox.push(sum);
//                                     }
//                                     queryParcelBox += " ORDER BY parcel_box.size_to ASC";
//                                     client.query(queryParcelBox, valuesParcelBox, function (errParcelBox, resParcelBox) {
//                                         try {
//                                             if (errParcelBox) {
//                                                 reject(errParcelBox);
//                                             }
//                                             if (!resParcelBox || !resParcelBox.rows || resParcelBox.rows.length === 0) {
//                                                 reject(new Error('No results returned from the query'));
//                                             } else {
//                                                 let weightTo = resParcelBox.rows[0].weight_to;
//                                                 let typeTransportationId = resParcelBox.rows[0].type_transportation_id;
//                                                 let dataProvince = resProvince.rows;
//                                                 let valuesTransportation = [];
//                                                 let queryTransportation = "SELECT \n" +
//                                                     "transportation_type.type_name, \n" +
//                                                     "transportation_type.parcel_pickup_point, \n" +
//                                                     "transportation_type.delivery_time, \n" +
//                                                     "transportation_img.img_url, \n" +
//                                                     "transportation_type_package_size.rate_bangkok_metro, \n" +
//                                                     "transportation_type_package_size.rate_bangkok_metro_to_other_provinces \n" +
//                                                     "FROM \n" +
//                                                     "transportation_rate " +
//                                                     "INNER JOIN transportation_type on \n" +
//                                                     "transportation_rate.transportation_type_id = transportation_type.id \n" +
//                                                     "INNER JOIN  transportation_img on \n" +
//                                                     "transportation_type.transportation_img_id = transportation_img.id \n" +
//                                                     "INNER JOIN  transportation_type_package_size on \n" +
//                                                     "transportation_type.id = transportation_type_package_size.transportation_type_id \n" +
//                                                     "INNER JOIN weigth on  \n" +
//                                                     "transportation_type_package_size.weigth_id = weigth.id \n"
//                                                 queryTransportation += " WHERE 1=1 \n";
//                                                 if (typeTransportationId) {
//                                                     queryTransportation += " AND transportation_type.id = $1 \n";
//                                                     valuesTransportation.push(typeTransportationId);
//                                                 }

//                                                 if (weightTo && dataParcel.weight) {
//                                                     if (dataParcel.weight > weightTo) {
//                                                         queryTransportation += ` AND weigth.weigth = $${valuesTransportation.length + 1} \n`;
//                                                         valuesTransportation.push(dataParcel.weight);
//                                                     } else {
//                                                         queryTransportation += ` AND weigth.weigth = $${valuesTransportation.length + 1} \n`;
//                                                         valuesTransportation.push(parseInt(weightTo));
//                                                     }
//                                                 }

//                                                 if (!dataParcel.width && !dataParcel.length && !dataParcel.height && !dataParcel.id && !dataParcel.weight) {
//                                                     queryTransportation += " AND 1=1";
//                                                 }

//                                                 queryTransportation += " AND transportation_type_package_size.is_active = true \n";

//                                                 queryTransportation += " GROUP BY " +
//                                                     "transportation_type.type_name, " +
//                                                     "transportation_type.parcel_pickup_point, " +
//                                                     "transportation_type.delivery_time, " +
//                                                     "transportation_img.img_url, " +
//                                                     "transportation_type_package_size.rate_bangkok_metro, " +
//                                                     "transportation_type_package_size.rate_bangkok_metro_to_other_provinces";
//                                                 client.query(queryTransportation, valuesTransportation, function (errTransportation, resTransportation) {
//                                                     try {
//                                                         if (errTransportation) {
//                                                             console.log('err :', errTransportation);
//                                                             reject(errTransportation);
//                                                         }
//                                                         if (!resTransportation || !resTransportation.rows || resTransportation.rows.length === 0) {
//                                                             reject(new Error('No results returned from the query'));
//                                                         } else {
//                                                             let dataTransportation = resTransportation.rows;
//                                                             let isBangkokMetro = false;
//                                                             let isOtherProvinces = false;
//                                                             let dataDeliveryService = [];
//                                                             let queryToProvince = `SELECT
//                                                        from_province.id as from_province_id,
//                                                        to_province.id as to_province_id,
//                                                        mst_within_bangkok_metro.destination_province_id AS bangkok_metro,
//                                                        mst_from_bangkok_metro_to_other_provinces.destination_province_id AS other_provinces
//                                                        FROM tb_mas_province from_province
//                                                        INNER JOIN tb_mas_province to_province ON from_province.id = $1 AND to_province.id = $2
//                                                        LEFT JOIN mst_within_bangkok_metro ON from_province.id = mst_within_bangkok_metro.destination_province_id AND to_province.id = mst_within_bangkok_metro.destination_province_id
//                                                        LEFT JOIN mst_from_bangkok_metro_to_other_provinces ON from_province.id = mst_from_bangkok_metro_to_other_provinces.destination_province_id AND to_province.id = mst_from_bangkok_metro_to_other_provinces.destination_province_id`;
//                                                             let values = [dataProvince[0].to_province_id, dataProvince[0].to_province_id];
//                                                             client.query(queryToProvince, values, function (err, res) {
//                                                                 try {
//                                                                     if (err) {
//                                                                         console.log('err :', err);
//                                                                         reject(err);
//                                                                     }
//                                                                     if (!res || !res.rows || res.rows.length === 0) {
//                                                                         reject(new Error('No results returned from the query'));
//                                                                     } else {
//                                                                         isBangkokMetro = res.rows[0].bangkok_metro ? true : false;
//                                                                         isOtherProvinces = res.rows[0].other_provinces ? true : false;
//                                                                         let lengthTransportation = dataTransportation.length;
//                                                                         for (let i = 0; i < dataTransportation.length; i++) {
//                                                                             let data = dataTransportation[i];
//                                                                             let rate = 0;
//                                                                             if (isBangkokMetro) {
//                                                                                 rate = data.rate_bangkok_metro;
//                                                                             } else if (isOtherProvinces) {
//                                                                                 rate = data.rate_bangkok_metro_to_other_provinces;
//                                                                             }
//                                                                             dataDeliveryService.push({
//                                                                                 type_name: data.type_name,
//                                                                                 parcel_pickup_point: data.parcel_pickup_point,
//                                                                                 delivery_time: data.delivery_time,
//                                                                                 img_url: data.img_url,
//                                                                                 rate: rate
//                                                                             });
//                                                                         }
//                                                                         // Check if dataDeliveryService.length equals dataTransportation.length before resolving
//                                                                         console.log('lengthTransportation :', lengthTransportation);
//                                                                         console.log('dataDeliveryService.length :', dataDeliveryService.length);
//                                                                         if (dataDeliveryService.length === lengthTransportation) {
//                                                                             dataDeliveryService.sort((a, b) => (a.rate > b.rate) ? 1 : -1);
//                                                                             resolve(dataDeliveryService.length > 0 ? dataDeliveryService : res.rows);
//                                                                         } else {
//                                                                             reject(new Error('Data delivery service and data transportation length mismatch'));
//                                                                         }
//                                                                     }
//                                                                 } catch (error) {
//                                                                     console.log('error :', error);
//                                                                     reject(error);
//                                                                 }
//                                                             }
//                                                         );
//                                                         }
//                                                     } catch (error) {
//                                                         console.log('error :', error);
//                                                         reject(error);
//                                                     }
//                                                 });
//                                             }
//                                         } catch (error) {
//                                             reject(error);
//                                         }
//                                     });
//                                 });
//                             }
//                         } catch (error) {
//                             reject(error);
//                         }
//                     });
//                 }
//             } catch (error) {
//                 reject(error);
//             }
//         });
//     });
// }

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