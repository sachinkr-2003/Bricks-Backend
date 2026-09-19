const Attendance = require('../models/Attendance');

exports.getAttendances = async (req, res) => { try { res.json(await Attendance.find().populate('labourId').sort({date:-1})); } catch (error) { res.status(500).json({ message: 'Server Error' }); } };
exports.markAttendance = async (req, res) => { try { res.status(201).json(await Attendance.create(req.body)); } catch (error) { res.status(400).json({ message: error.message }); } };
exports.getAttendanceById = async (req, res) => { 
  try { const a = await Attendance.findById(req.params.id).populate('labourId'); a ? res.json(a) : res.status(404).json({message: 'Not found'}); } 
  catch (error) { res.status(500).json({ message: 'Server Error' }); } 
};
exports.updateAttendance = async (req, res) => { 
  try { const a = await Attendance.findByIdAndUpdate(req.params.id, req.body, {new: true}); a ? res.json(a) : res.status(404).json({message: 'Not found'}); } 
  catch (error) { res.status(500).json({ message: 'Server Error' }); } 
};
exports.deleteAttendance = async (req, res) => { 
  try { await Attendance.findByIdAndDelete(req.params.id); res.json({message: 'Removed'}); } 
  catch (error) { res.status(500).json({ message: 'Server Error' }); } 
};
