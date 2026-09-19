const MasterResource = require('../models/MasterResource');

exports.getResources = async (req, res) => { 
  try { const filter = { isActive: true }; if(req.query.type) filter.type = req.query.type; res.json(await MasterResource.find(filter).sort({createdAt:-1})); } 
  catch (error) { res.status(500).json({ message: 'Server Error' }); } 
};
exports.addResource = async (req, res) => { try { res.status(201).json(await MasterResource.create(req.body)); } catch (error) { res.status(400).json({ message: error.message }); } };
exports.getResourceById = async (req, res) => { 
  try { const r = await MasterResource.findById(req.params.id); r ? res.json(r) : res.status(404).json({message: 'Not found'}); } 
  catch (error) { res.status(500).json({ message: 'Server Error' }); } 
};
exports.updateResource = async (req, res) => { 
  try { const r = await MasterResource.findByIdAndUpdate(req.params.id, req.body, {new: true}); r ? res.json(r) : res.status(404).json({message: 'Not found'}); } 
  catch (error) { res.status(500).json({ message: 'Server Error' }); } 
};
exports.deleteResource = async (req, res) => { 
  try { await MasterResource.findByIdAndDelete(req.params.id); res.json({message: 'Removed'}); } 
  catch (error) { res.status(500).json({ message: 'Server Error' }); } 
};
