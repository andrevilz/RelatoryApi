const express = require('express');
const {
    handleAddData,
    handleGetReportsByDateRange,
    handleGetAllReports,
    handleGetReportsByUser,
    handleGetReportsByUserAndDateRange,
} = require('../controllers/dataController');

const router = express.Router();

router.post('/add', handleAddData);
router.get('/reports/dateRange', handleGetReportsByDateRange);
router.get('/reports/all', handleGetAllReports);
router.get('/reports/user', handleGetReportsByUser);
router.get('/reports/userAndDateRange', handleGetReportsByUserAndDateRange);

module.exports = router;
