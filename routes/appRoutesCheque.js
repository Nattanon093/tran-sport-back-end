var ChequeController = require("../controllers/ChequeController");

module.exports = function (app) {
  const key = "/api/v1";

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

  // searchCheque
  app.post(`${key}/cheque/searchCheque`, function (req, res) {
    ChequeController.searchCheque(req.body, function (err, task) {
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

  // updateCheque
  app.put(`${key}/cheque/updateCheque`, function (req, res) {
    ChequeController.updateCheque(req.body, function (err, task) {
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

  // deleteCheque
  app.delete(`${key}/cheque/deleteCheque`, function (req, res) {
    ChequeController.deleteCheque(req.body, function (err, task) {
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
};
