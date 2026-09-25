const mongoose = require('mongoose');

const warrantySchema = new mongoose.Schema({
  issueType: { 
    type: String, 
    required: true,
    enum: ['Seepage', 'Structural', 'Plumbing', 'Electrical', 'Other']
  },
  description: { type: String, required: true },
  status: { 
    type: String, 
    default: 'Pending Review',
    enum: ['Pending Review', 'In Progress', 'Resolved', 'Completed'] 
  },
  technician: { type: String, default: 'Unassigned' },
  projectId: { type: String, default: 'DEFAULT_PROJ' },
}, { timestamps: true });

module.exports = mongoose.model('Warranty', warrantySchema);
