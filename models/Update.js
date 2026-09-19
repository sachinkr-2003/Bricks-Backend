const mongoose = require('mongoose');

const updateSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now, required: true },
  description: { type: String, required: true },
  photos: [{ type: String }], // Array of image URLs
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: false },
}, { timestamps: true });

module.exports = mongoose.model('Update', updateSchema);
