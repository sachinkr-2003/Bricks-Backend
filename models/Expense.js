const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now, required: true },
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  paidTo: { type: String, required: true },
  remarks: { type: String, default: 'None' },
  billImage: { type: String, required: false },
  status: { type: String, default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);
