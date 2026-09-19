const Project = require('../models/Project');
const MaterialBill = require('../models/MaterialBill');
const Attendance = require('../models/Attendance');

exports.getDashboardStats = async (req, res) => { 
  try { 
    // Basic aggregation for dashboard
    const projectsCount = await Project.countDocuments();
    const totalBills = await MaterialBill.aggregate([{ $group: { _id: null, total: { $sum: '$totalCost' } } }]);
    const totalAttendance = await Attendance.countDocuments({ status: 'Present' });
    
    res.json({
        totalProjects: projectsCount,
        totalExpenditure: totalBills.length > 0 ? totalBills[0].total : 0,
        totalActiveWorkers: totalAttendance
    });
  } catch (error) { res.status(500).json({ message: 'Server Error' }); } 
};
