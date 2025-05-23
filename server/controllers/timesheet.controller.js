const { TimesheetReport, User } = require('../models');

const clockIn = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: 'Request body is required' });
    }

    const { date, startTime } = req.body;

    if (!date) {
      return res.status(400).json({ message: 'Date is required' });
    }
    if (!startTime) {
      return res.status(400).json({ message: 'startTime is required' });
    }

    const userId = req.user.userId;

    const existing = await TimesheetReport.findOne({
      where: { userId, date },
    });

    if (existing) {
      return res.status(400).json({ message: 'Already clocked in today' });
    }

    const report = await TimesheetReport.create({
      userId,
      date,
      startTime,
      endTime: null,
      status: 'Pending',
    });

    res.status(201).json({ message: 'Clocked in successfully', report });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const clockOut = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: 'Request body is required' });
    }

    const { date, endTime } = req.body;

    if (!date) {
      return res.status(400).json({ message: 'Date is required' });
    }
    if (!endTime) {
      return res.status(400).json({ message: 'endTime is required' });
    }

    const userId = req.user.userId;

    const report = await TimesheetReport.findOne({
      where: { userId, date },
    });

    if (!report) {
      return res.status(404).json({ message: 'No clock-in record found for today' });
    }

    if (report.endTime) {
      return res.status(400).json({ message: 'Already clocked out' });
    }

    report.endTime = endTime;
    await report.save();

    res.json({ message: 'Clocked out successfully', report });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const viewMyReports = async (req, res) => {
  try {
    const userId = req.user.userId;

    const reports = await TimesheetReport.findAll({
      where: { userId },
      order: [['date', 'DESC']],
    });

    res.json({ reports });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const reportReview = async (req, res) => {
  try {
    const { reportId } = req.params;
    const { status } = req.body;
    const role = req.user.role;

    if (role !== 'Manager') {
      return res.status(403).json({ message: 'Only managers can approve/reject reports' });
    }

    const report = await TimesheetReport.findByPk(reportId);

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    if (!['Approved', 'Rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    report.status = status;
    await report.save();

    res.json({ message: `Report ${status.toLowerCase()} successfully`, report });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const viewEmployeesReports = async (req, res) => {
  try {
    const { role, userId: managerId } = req.user;

    if (role !== 'Manager') {
      return res.status(403).json({ message: 'Only managers can view employees reports' });
    }

    const employees = await TimesheetReport.findAll({
      include: {
        model: require('../models').User,
        as: 'employee',
        where: { managerId },
        attributes: ['id', 'firstName', 'lastName', 'email'],
      },
      order: [['date', 'DESC']],
    });

    res.json({ employees });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const removeReport = async (req, res) => {
  try {
    const { reportId } = req.params;
    const { userId, role } = req.user;

    const report = await TimesheetReport.findByPk(reportId);

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    // Check if user is the owner of the report or a manager
    if (report.userId !== userId && role !== 'Manager') {
      return res.status(403).json({ message: 'Not authorized to delete this report' });
    }

    // If user is a manager, check if they manage the employee
    if (role === 'Manager') {
      const employee = await User.findByPk(report.userId);
      if (employee.managerId !== userId) {
        return res.status(403).json({ message: 'Not authorized to delete this report' });
      }
    }

    await report.destroy();
    res.json({ message: 'Report deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const test = async (req, res) => {
  try {
    const userId = req.user.userId;
    res.json({ message: 'Test', userId });
  } catch {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = {
  clockIn,
  clockOut,
  test,
  viewMyReports,
  reportReview,
  viewEmployeesReports,
  removeReport,
};
