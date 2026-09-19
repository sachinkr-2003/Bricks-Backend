const MaterialBill = require('../models/MaterialBill');

exports.getBills = async (req, res) => { try { res.json(await MaterialBill.find().populate('vendorId').sort({date:-1})); } catch (error) { res.status(500).json({ message: 'Server Error' }); } };
exports.addBill = async (req, res) => { try { res.status(201).json(await MaterialBill.create(req.body)); } catch (error) { res.status(400).json({ message: error.message }); } };
exports.getBillById = async (req, res) => { 
  try { const b = await MaterialBill.findById(req.params.id).populate('vendorId'); b ? res.json(b) : res.status(404).json({message: 'Not found'}); } 
  catch (error) { res.status(500).json({ message: 'Server Error' }); } 
};
exports.updateBill = async (req, res) => { 
  try { const b = await MaterialBill.findByIdAndUpdate(req.params.id, req.body, {new: true}); b ? res.json(b) : res.status(404).json({message: 'Not found'}); } 
  catch (error) { res.status(500).json({ message: 'Server Error' }); } 
};
exports.deleteBill = async (req, res) => { 
  try { await MaterialBill.findByIdAndDelete(req.params.id); res.json({message: 'Removed'}); } 
  catch (error) { res.status(500).json({ message: 'Server Error' }); } 
};
