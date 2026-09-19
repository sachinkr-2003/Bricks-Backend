const mongoose = require('mongoose');

const masterResourceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: false },
  category: { 
    type: String, 
    required: true,
    enum: ['Mazdoor (Helper)', 'Rajmistri (Mason)', 'Carpenter', 'Plumber', 'Electrician', 'Vendor/Supplier', 'Other']
  },
  type: {
    type: String,
    required: true,
    enum: ['labour', 'vendor']
  },
  defaultCost: { type: Number, default: 0 },
  companyId: { 
    type: String, 
    required: true,
    default: 'DEFAULT_COMP' // In future, maps to the logged-in user's company
  },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('MasterResource', masterResourceSchema);
