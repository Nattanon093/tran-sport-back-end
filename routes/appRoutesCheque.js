var ChequeController = require('../controllers/ChequeController');

module.exports = function (app) {
    const key = '/api/v1';

    // getCheque
    app.get(`${key}/cheque/getCheque`, function (req, res) {
        ChequeController.getCheque(req.body, function (err, task) {
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

    // createCheque
    app.post(`${key}/cheque/createCheque`, function (req, res) {
        ChequeController.createCheque(req.body, function (err, task) {
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
    // app.delete(`${key}/bill/deleteBill`, function (req, res) {
    //     BillController.deleteBill(req.body, function (err, task) {
    //         try {
    //             if (err) {
    //                 return res.send(err);
    //             }
    //             return res.send(task);
    //         } catch (error) {
    //             return res.send(error);
    //         }
    //     });
    // });

    
}

