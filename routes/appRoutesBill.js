var BillController = require('../controllers/BillController');
var bill_model = require('../models/BillModels');

// generateBillNo

module.exports = function (app) {
    const key = '/api/v1';
    app.get(`${key}/bill/generateBillNo`, function (req, res) {
        BillController.generateBillNo(req.body, function (err, task) {
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

    // getBill
    app.get(`${key}/bill/getBill`, function (req, res) {
        BillController.getBill(req.body, function (err, task) {
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

    // getBillByBillNo/:bill_no
    app.get(`${key}/bill/getBillByBillNo/:bill_no`, function (req, res) {
        BillController.getBillByBillNo(req.params, function (err, task) {
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
    

    // getBillByCustomer
    app.get(`${key}/bill/getBillByCustomer`, function (req, res) {
        BillController.getBillByCustomer(req.body, function (err, task) {
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

    // getBillByDate
    app.get(`${key}/bill/getBillByDate`, function (req, res) {
        BillController.getBillByDate(req.body, function (err, task) {
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

    // createBill
    app.post(`${key}/bill/createBill`, function (req, res) {
        BillController.createBill(req.body, function (err, task) {
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

    // updateBill
    app.put(`${key}/bill/updateBill`, function (req, res) {
        BillController.updateBill(req.body, function (err, task) {
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

    // deleteBill
    app.delete(`${key}/bill/deleteBill`, function (req, res) {
        BillController.deleteBill(req.body, function (err, task) {
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

