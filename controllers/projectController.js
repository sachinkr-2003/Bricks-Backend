const Project = require('../models/Project');

exports.getProjects = async (req, res) => { try { res.json(await Project.find()); } catch (error) { res.status(500).json({ message: 'Server Error' }); } };
exports.addProject = async (req, res) => { try { res.status(201).json(await Project.create(req.body)); } catch (error) { res.status(400).json({ message: error.message }); } };
exports.getProjectById = async (req, res) => { 
  try { const p = await Project.findById(req.params.id); p ? res.json(p) : res.status(404).json({message: 'Not found'}); } 
  catch (error) { res.status(500).json({ message: 'Server Error' }); } 
};
exports.updateProject = async (req, res) => { 
  try { const p = await Project.findByIdAndUpdate(req.params.id, req.body, {new: true}); p ? res.json(p) : res.status(404).json({message: 'Not found'}); } 
  catch (error) { res.status(500).json({ message: 'Server Error' }); } 
};
exports.deleteProject = async (req, res) => { 
  try { await Project.findByIdAndDelete(req.params.id); res.json({message: 'Removed'}); } 
  catch (error) { res.status(500).json({ message: 'Server Error' }); } 
};
exports.updateConfig = async (req, res) => {
  try {
    let proj = await Project.findOne();
    if (!proj) {
      proj = await Project.create({ name: 'Default Project', address: 'Default', totalBudget: 5000000 });
    }
    const up = await Project.findByIdAndUpdate(proj._id, req.body, {new: true});
    res.json(up);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
