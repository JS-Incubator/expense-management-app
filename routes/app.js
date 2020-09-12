const router = require('express').Router();
const {
  getDashboard,
  getAccounts,
  getAddAccount,
  postAddAccount,
  getEditAccount,
  postEditAccount,
} = require('../controller/accountController');

//@desc Render the dashboard
//@route GET /app/dashboard
router.get('/dashboard', getDashboard);

//@desc Render the account management scree
//@route GET /app/accounts
router.get('/accounts', getAccounts);

//@desc Render add account page
//@route GET /app/add-account
router.get('/add-account', getAddAccount);

//@desc Save new account data to the Accounts Modal
//@route POST /app/add-account
router.post('/add-account', postAddAccount);

//@desc Propegate edit modal window with account data
//@route GET /app/edit-account
router.get('/edit-account/:id', getEditAccount);

//@desc Update Account modal with new account Data
//@route POST /app/edit-account
router.post('/edit-account/:id', postEditAccount);

module.exports = router;
