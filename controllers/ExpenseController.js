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

  Task.getExpenseById = async function getExpenseById(data, result) {
    try {
      var response = await ExpenseModel.getExpenseById(data);
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

  Task.updateExpense = async function updateExpense(data, result) {
    try {
      var response = await ExpenseModel.updateExpense(data);
      result(response);
    } catch (error) {
      result(error);
    }
  };

  Task.deleteExpense = async function deleteExpense(data, result) {
    try {
      var response = await ExpenseModel.deleteExpense(data);
      result(response);
    } catch (error) {
      result(error);
    }
  };

  module.exports = Task;