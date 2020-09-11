const router = require('express').Router();
const {
  getDashboard,
  postAddAccount,
  getAccounts,
} = require('../controller/appController');

//@desc Render the dashboard
//@route GET /app/dashboard
router.get('/dashboard', getDashboard);

//@desc Save new account data to the Accounts Modal
//@route POST /app/add-account
router.post('/add-account', postAddAccount);

//@desc Render the account management scree
//@route GET /app/accounts
router.get('/accounts', getAccounts);

module.exports = router;
