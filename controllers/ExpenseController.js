var ExpenseModel = require("../models/ExpenseModels");

var Task = function (task) {
  this.task = task.task;
};

Task.getExpense = async function getExpense(data, result) {
    try {
      var response = await ExpenseModel.getExpense(data);
      result(response);
    } catch (error) {
      result(error);
    }
  };

  Task.createExpense = async function createExpense(data, result) {
    try {
      var response = await ExpenseModel.createExpense(data);
      result(response);
    } catch (error) {
      result(error);
    }
  };

  module.exports = Task;