const mongoose = require('mongoose');

const materialBillSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'MasterResource', required: true },
  materialName: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, required: true },
  totalCost: { type: Number, required: true },
  paidAmount: { type: Number, default: 0 },
  status: { type: String, enum: ['Paid', 'Pending', 'Partial'], required: true },
  billImage: { type: String, required: false }, // URL to uploaded image
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: false },
}, { timestamps: true });

module.exports = mongoose.model('MaterialBill', materialBillSchema);
