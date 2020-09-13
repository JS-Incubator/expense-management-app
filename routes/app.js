const router = require('express').Router();
const {
  getDashboard,
  getAccounts,
  postAddAccount,
  getEditAccount,
  postEditAccount,
} = require('../controller/accountController');

const {
  getCategories,
  getAddMainCat,
  getAddSubCat,
  postAddMainCat,
  postAddSubCat,
} = require('../controller/categoryController');

//* Account management routs  */

//@desc Render the dashboard
//@route GET /app/dashboard
router.get('/dashboard', getDashboard);

//@desc Render the account management scree
//@route GET /app/accounts
router.get('/accounts', getAccounts);

//@desc Save new account data to the Accounts Modal
//@route POST /app/add-account
router.post('/account/add', postAddAccount);

//@desc Propegate edit modal window with account data
//@route GET /app/edit-account
router.get('/account/edit/:id', getEditAccount);

//@desc Update Account modal with new account Data
//@route POST /app/edit-account
router.post('/account/edit/:id', postEditAccount);

//* Catogery management routs */

//@desc Render the category management screen
//@route GET /app/categories
router.get('/categories', getCategories);

//@desc Add new main category
//@route GET /app/categories/add-main
router.get('/category/add/main', getAddMainCat);

//@desc Add new sub category
//@route GET /app/categories/add-sub
router.get('/category/add/sub', getAddSubCat);

module.exports = router;
