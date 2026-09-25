const Project = require('../models/Project');
const MaterialBill = require('../models/MaterialBill');
const Attendance = require('../models/Attendance');
const Expense = require('../models/Expense');

// ✅ Full dashboard stats — includes project details, budget, and workforce
exports.getDashboardStats = async (req, res) => { 
  try { 
    // Fetch the first project (single-project mode)
    const project = await Project.findOne({});

    const projectsCount = await Project.countDocuments();
    const totalBills = await MaterialBill.aggregate([{ $group: { _id: null, total: { $sum: '$totalCost' } } }]);
    const totalAttendance = await Attendance.countDocuments({ status: 'Present' });
    
    res.json({
      totalProjects: projectsCount,
      totalExpenditure: totalBills.length > 0 ? totalBills[0].total : 0,
      totalActiveWorkers: totalAttendance,
      // ✅ Include project details so dashboard card can show them 
      project: project ? {
        _id: project._id,
        name: project.name,
        address: project.address,
        currentStage: project.currentStage || 'Planning',
        completionPercentage: project.completionPercentage || 0,
        startDate: project.startDate || null,
        expectedEndDate: project.expectedEndDate || null,
        totalBudget: project.totalBudget || 0,
        approvedAdditional: project.approvedAdditional || 0,
      } : null
    });
  } catch (error) { 
    console.error('[ANALYTICS] getDashboardStats error:', error);
    res.status(500).json({ message: 'Server Error' }); 
  } 
};

// ✅ Budget stats aggregated from all spending
exports.getBudgetStats = async (req, res) => {
  try {
    const project = await Project.findOne({}) || { totalBudget: 0, approvedAdditional: 0 };
    
    const materialBills = await MaterialBill.aggregate([{ $group: { _id: null, total: { $sum: '$totalCost' } } }]);
    const attendance = await Attendance.aggregate([{ $group: { _id: null, total: { $sum: '$advanceGiven' } } }]);
    const expenses = await Expense.aggregate([{ $group: { _id: null, total: { $sum: '$amount' } } }]);

    const matTotal = materialBills.length > 0 ? materialBills[0].total : 0;
    const labTotal = attendance.length > 0 ? attendance[0].total : 0;
    const expTotal = expenses.length > 0 ? expenses[0].total : 0;
    
    res.json({
      totalContractValue: project.totalBudget || 0,
      amountPaid: matTotal + labTotal + expTotal,
      materialCost: matTotal,
      labourCost: labTotal,
      otherExpenses: expTotal,
      approvedAdditional: project.approvedAdditional || 0
    });
  } catch (error) {
    console.error('[ANALYTICS] getBudgetStats error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
