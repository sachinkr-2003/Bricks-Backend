const Lead = require('../models/Lead');

exports.getLeads = async (req, res) => { try { res.json(await Lead.find().sort({createdAt:-1})); } catch (error) { res.status(500).json({ message: 'Server Error' }); } };
exports.addLead = async (req, res) => { try { res.status(201).json(await Lead.create(req.body)); } catch (error) { res.status(400).json({ message: error.message }); } };
exports.updateLeadStatus = async (req, res) => { 
  try { const l = await Lead.findByIdAndUpdate(req.params.id, { status: req.body.status }, {new: true}); l ? res.json(l) : res.status(404).json({message: 'Not found'}); } 
  catch (error) { res.status(500).json({ message: 'Server Error' }); } 
};
