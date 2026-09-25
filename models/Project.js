const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  managerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  startDate: { type: Date },
  expectedEndDate: { type: Date },
  totalBudget: { type: Number, required: true },
  approvedAdditional: { type: Number, default: 0 },
  currentStage: { type: String, default: 'Planning' },
  completionPercentage: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
