var ExpenseController = require("../controllers/ExpenseController");

module.exports = function (app) {
  const key = "/api/v1";

  // getExpense
  app.get(`${key}/expense/getExpense`, function (req, res) {
    ExpenseController.getExpense(req.body, function (err, task) {
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

  // getExpenseById
  app.get(`${key}/expense/getExpenseById/:id`, function (req, res) {
    ExpenseController.getExpenseById(req.params, function (err, task) {
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

  // createExpense
  app.post(`${key}/expense/createExpense`, function (req, res) {
    ExpenseController.createExpense(req.body, function (err, task) {
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

  // updateExpense
  app.put(`${key}/expense/updateExpense`, function (req, res) {
    ExpenseController.updateExpense(req.body, function (err, task) {
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

  // deleteExpense
  app.put(`${key}/expense/deleteExpense`, function (req, res) {
    ExpenseController.deleteExpense(req.body, function (err, task) {
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
