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
}