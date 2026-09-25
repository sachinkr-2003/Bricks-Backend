const Update = require('../models/Update');

exports.getUpdates = async (req, res) => { try { res.json(await Update.find().sort({date:-1})); } catch (error) { res.status(500).json({ message: 'Server Error' }); } };
exports.addUpdate = async (req, res) => { 
  try { 
    if (req.files && req.files.length > 0) {
      req.body.photos = req.files.map(f => `/uploads/${f.filename}`);
    }
    res.status(201).json(await Update.create(req.body)); 
  } catch (error) { 
    res.status(400).json({ message: error.message }); 
  } 
};
exports.getUpdateById = async (req, res) => { 
  try { const u = await Update.findById(req.params.id); u ? res.json(u) : res.status(404).json({message: 'Not found'}); } 
  catch (error) { res.status(500).json({ message: 'Server Error' }); } 
};
exports.updateUpdate = async (req, res) => { 
  try { const u = await Update.findByIdAndUpdate(req.params.id, req.body, {new: true}); u ? res.json(u) : res.status(404).json({message: 'Not found'}); } 
  catch (error) { res.status(500).json({ message: 'Server Error' }); } 
};
exports.deleteUpdate = async (req, res) => { 
  try { await Update.findByIdAndDelete(req.params.id); res.json({message: 'Removed'}); } 
  catch (error) { res.status(500).json({ message: 'Server Error' }); } 
};
