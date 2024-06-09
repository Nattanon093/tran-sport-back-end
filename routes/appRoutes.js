var RoutesController = require('../controllers/RoutesController');
var routes_model = require('../models/RoutesModel');

module.exports = function (app) {
    const key = '/api/v1';

    app.get(`${key}/getProvinceAndDistrictAndSubDistrict`, function (req, res) {
        RoutesController.getProvinceAndDistrictAndSubDistrict(req.body, function (err, task) {
            try {
                if (err) {
                    return res.send(err);
                }
                return res.send(task);
            } catch (error) {
                return res.send(error);
            }
        });
    });

    app.post(`${key}/getDeliveryService`, function (req, res) {
        RoutesController.getDeliveryService(req.body, function (err, task) {
            try {
                if (err) {
                    return res.send(err);
                }
                return res.send(task);
            } catch (error) {
                return res.send(error);
            }
        });
    });

    app.get(`${key}/getParcelBoxSize`, function (req, res) {
        RoutesController.getParcelBoxSize(req.body, function (err, task) {
            try {
                if (err) {
                    return res.send(err);
                }
                return res.send(task);
            } catch (error) {
                return res.send(error);
            }
        });
    });

    // http://bsxpress.co/Master/Tracking_CheckProvider?x=TH01165P7P2C7A1
    // สร้าง API สำหรับตรวจสอบสถานะพัสดุ โดยรับค่า Tracking Number และ Provider แล้วส่งค่าไปยัง API ของบริษัท และส่งค่าที่ได้กลับมาให้ผู้ใช้ โดยให้ผู้ใช้สามารถเลือก Provider ได้ 2 บริษัท คือ Kerry และ Flash Express
    app.post(`${key}/Tracking_CheckProvider`, function (req, res) {
        RoutesController.Tracking_CheckProvider(req.body, function (err, task) {
            try {
                if (err) {
                    return res.send(err);
                }
                return res.send(task);
            } catch (error) {
                return res.send(error);
            }
        });
    });
    
}