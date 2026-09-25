const Expense = require('../models/Expense');

exports.getExpenses = async (req, res) => { try { res.json(await Expense.find().sort({date:-1})); } catch (error) { res.status(500).json({ message: 'Server Error' }); } };
exports.addExpense = async (req, res) => { try { res.status(201).json(await Expense.create(req.body)); } catch (error) { res.status(400).json({ message: error.message }); } };
exports.updateExpense = async (req, res) => { 
  try { const e = await Expense.findByIdAndUpdate(req.params.id, req.body, {new: true}); e ? res.json(e) : res.status(404).json({message: 'Not found'}); } 
  catch (error) { res.status(500).json({ message: 'Server Error' }); } 
};
