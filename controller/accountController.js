const Account = require('../models/account');

module.exports = {
  getDashboard: (req, res) => {
    res.render('app/dashboard', {
      pageTitle: 'Dashboard',
      pageHeader: 'Your Dashboard',
    });
  },

  getAccounts: async (req, res) => {
    const accounts = await Account.find();
    //console.log(accounts);
    // TODO: Filtering the account types here, Will be moved to its own modal later
    const accountTypes = [];
    accounts.forEach((account) => {
      if (accountTypes.indexOf(account.accountType) === -1) {
        accountTypes.push(account.accountType);
      }
    });
    res.render('app/account/account-mgt', {
      pageTitle: 'Account Managememt',
      pageHeader: 'Manage Your Accounts',
      accountTypes,
      accounts,
      account: null,
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

  getEditAccount: async (req, res) => {
    const account = await Account.findById(req.params.id);
    if (!account) {
      res.redirect('/app/accounts');
    } else {
      res.render('app/account/editAccount', {
        pageTitle: 'Edit Account',
        pageHeader: 'Edit Account',
        account,
      });
    }
  },

  postEditAccount: async (req, res) => {
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
    await Account.findByIdAndUpdate(req.params.id, account);
    res.redirect('/app/accounts');
  },
};
