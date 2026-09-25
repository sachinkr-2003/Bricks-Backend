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

exports.getBudgetStats = async (req, res) => {
  try {
    const Project = require('../models/Project');
    // Fetch first project configuration for now (assuming single project mode)
    const project = await Project.findOne({}) || { totalBudget: 0, approvedAdditional: 0 };
    
    const materialBills = await MaterialBill.aggregate([{ $group: { _id: null, total: { $sum: '$totalCost' } } }]);
    const attendance = await Attendance.aggregate([{ $group: { _id: null, total: { $sum: '$advanceGiven' } } }]);
    const Expense = require('../models/Expense');
    const expenses = await Expense.aggregate([{ $group: { _id: null, total: { $sum: '$amount' } } }]);

    const matTotal = materialBills.length > 0 ? materialBills[0].total : 0;
    const labTotal = attendance.length > 0 ? attendance[0].total : 0;
    const expTotal = expenses.length > 0 ? expenses[0].total : 0;
    
    res.json({
      totalContractValue: project.totalBudget,
      amountPaid: matTotal + labTotal + expTotal,
      materialCost: matTotal,
      labourCost: labTotal,
      otherExpenses: expTotal,
      approvedAdditional: project.approvedAdditional
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
