const Warranty = require('../models/Warranty');

exports.createComplaint = async (req, res) => {
  try {
    const { issueType, description } = req.body;
    const newComplaint = new Warranty({
      issueType,
      description
    });
    
    await newComplaint.save();
    res.status(201).json({ success: true, message: 'Complaint lodged successfully', data: newComplaint });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to lodge complaint', error: error.message });
  }
};

exports.getComplaints = async (req, res) => {
  try {
    const complaints = await Warranty.find().sort({ createdAt: -1 });
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch complaints' });
  }
};
