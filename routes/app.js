const router = require('express').Router();
const {getDashboard} = require('../controller/appController');

//@desc Render the dashboard
//@route GET /app/dashboard
router.get('/dashboard', getDashboard);

module.exports = router;
