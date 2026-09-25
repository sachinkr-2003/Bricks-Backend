const mongoose = require('mongoose');

const updateSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now, required: true },
  workCompleted: { type: String, required: true },
  workInProgress: { type: String, default: 'None' },
  nextPlan: { type: String, default: 'None' },
  issues: { type: String, default: 'None' },
  photos: [{ type: String }], // Array of image URLs
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: false },
}, { timestamps: true });

module.exports = mongoose.model('Update', updateSchema);
