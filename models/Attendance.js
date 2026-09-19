const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  labourId: { type: mongoose.Schema.Types.ObjectId, ref: 'MasterResource', required: true },
  status: { type: String, enum: ['Present', 'Absent', 'Half Day'], required: true },
  hours: { type: Number, default: 0 }, // E.g. OT hours
  advanceGiven: { type: Number, default: 0 }, // Paisa diya 
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: false },
}, { timestamps: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
