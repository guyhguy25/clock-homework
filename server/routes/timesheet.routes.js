const express = require('express');
const router = express.Router();
const timesheetController = require('../controllers/timesheet.controller');
const authMiddleware = require('../middlewares/auth.middleware')

router.post('/clock-in', authMiddleware, timesheetController.clockIn);
router.post('/clock-out', authMiddleware, timesheetController.clockOut);
router.get('/my-reports', authMiddleware, timesheetController.viewMyReports);
router.delete('/:reportId', authMiddleware, timesheetController.removeReport);

// Manager
router.patch('/review/:reportId', authMiddleware, timesheetController.reportReview);
router.get('/employees-reports', authMiddleware, timesheetController.viewEmployeesReports);

// Test
router.get('/test', authMiddleware, timesheetController.test);

module.exports = router;