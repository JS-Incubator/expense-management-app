const Account = require('../models/account');
const account = require('../models/account');

module.exports = {
  getDashboard: (req, res) => {
    res.render('app/dashboard', {
      pageTitle: 'Dashboard',
    });
  },

  getAccountManagement: (req, res) => {
    res.render('app/account-management.ejs', {pageTitle: 'Account Management'});
  },

  getAccounts: async (req, res) => {
    const accounts = await Account.find();
    //Filtering the account types, Will be moved to its own modal later
    const accountTypes = [];
    accounts.forEach((account) => {
      const isUnique = (type) => type === account.accountType;
      if (accountTypes.findIndex(isUnique)) {
        accountTypes.push(account.accountType);
      }
    });
    res.render('app/account-management', {
      pageTitle: 'Account Managememt',
      accountTypes,
      accounts,
    });
  },

  postAddAccount: async (req, res) => {
    const account = {
      accountName: req.body.accountName,
      accountType: req.body.accountType,
      openingDate: req.body.openingDate,
      openingBalance: req.body.openingBalance
        ? parseFloat(req.body.openingBalance)
        : 0,
      currentBalance: parseFloat(req.body.currentBalance),
      defaultCurrency: req.body.currency,
    };

    try {
      await Account.create(account);
      res.redirect('/app/accounts');
    } catch (error) {
      console.error(error);
    }
  },
};
