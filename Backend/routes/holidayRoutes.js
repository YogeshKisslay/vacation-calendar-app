const express = require('express');
const router = express.Router();
const { getHolidays } = require('../controllers/holidayController');

// Define the route for getting holidays
// GET /api/holidays/:countryCode/:year
router.get('/:countryCode/:year', getHolidays);

module.exports = router;