var CompanyController = require('../controllers/CompanyController');
var company_model = require('../models/CompanyModels');

module.exports = function (app) {
    const key = '/api/v1';
    app.get(`${key}/company/getCompany`, function (req, res) {
        CompanyController.getCompany(req.body, function (err, task) {
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


    app.get(`${key}/company/getCompanyById/:id`, function (req, res) {
        CompanyController.getCompanyById(req.params, function (err, task) {
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