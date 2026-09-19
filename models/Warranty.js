const mongoose = require('mongoose');

const warrantySchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  provider: { type: String, required: true },
  validUntil: { type: Date, required: true },
  status: { type: String, enum: ['Active', 'Expired', 'Claimed'], default: 'Active' },
  documentUrl: { type: String }, // PDF or image logic
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: false },
}, { timestamps: true });

module.exports = mongoose.model('Warranty', warrantySchema);
