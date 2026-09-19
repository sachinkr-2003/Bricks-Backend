const Warranty = require('../models/Warranty');

exports.getWarranties = async (req, res) => { try { res.json(await Warranty.find().sort({validUntil: 1})); } catch (error) { res.status(500).json({ message: 'Server Error' }); } };
exports.addWarranty = async (req, res) => { try { res.status(201).json(await Warranty.create(req.body)); } catch (error) { res.status(400).json({ message: error.message }); } };
exports.getWarrantyById = async (req, res) => { 
  try { const w = await Warranty.findById(req.params.id); w ? res.json(w) : res.status(404).json({message: 'Not found'}); } 
  catch (error) { res.status(500).json({ message: 'Server Error' }); } 
};
exports.updateWarranty = async (req, res) => { 
  try { const w = await Warranty.findByIdAndUpdate(req.params.id, req.body, {new: true}); w ? res.json(w) : res.status(404).json({message: 'Not found'}); } 
  catch (error) { res.status(500).json({ message: 'Server Error' }); } 
};
exports.deleteWarranty = async (req, res) => { 
  try { await Warranty.findByIdAndDelete(req.params.id); res.json({message: 'Removed'}); } 
  catch (error) { res.status(500).json({ message: 'Server Error' }); } 
};
