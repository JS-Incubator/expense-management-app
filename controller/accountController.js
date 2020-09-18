const {NotExtended} = require('http-errors');
const mogoose = require('mongoose');
const Account = require('../models/account');

module.exports = {
  getDashboard: (req, res) => {
    res.render('app/dashboard', {
      pageTitle: 'Dashboard',
      pageHeader: 'Your Dashboard',
    });
  },

  getAccounts: async (req, res, next) => {
    const user = req.session.sessionToken
      ? req.session.sessionToken.user
      : null;

    if (!user) {
      const error = new Error();
      error.statusCode = 400;
      error.message =
        'We are unable to find an active session, Kindly login agian';
      return next(error);
    }
    try {
      const accounts = await Account.find({user});
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
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  postAddAccount: async (req, res, next) => {
    const user = req.session.sessionToken
      ? req.session.sessionToken.user
      : null;
    try {
      if (!user) {
        const error = new Error();
        error.statusCode = 400;
        error.message =
          'We are unable to find an active session, Kindly login agian';
        return next(error);
      }
      const account = {
        accountName: req.body.account.accountName,
        accountType: req.body.account.accountType,
        openingDate: req.body.account.openingDate,
        openingBalance: req.body.account.openingBalance
          ? parseFloat(req.body.account.openingBalance)
          : 0,
        currentBalance: parseFloat(req.body.account.currentBalance),
        defaultCurrency: req.body.account.defaultCurrency,
        user,
      };
      await Account.create(account);
      return res.redirect('/app/accounts');
    } catch (err) {
      const error = new Error();
      error.statusCode = 400;
      error.message = err;
      return next(error);
    }
  },

  getEditAccount: async (req, res, next) => {
    const user = req.session.sessionToken
      ? req.session.sessionToken.user
      : null;
    const accountId = req.params.id;

    if (!user) {
      const error = new Error();
      error.statusCode = 400;
      error.message =
        'We are unable to find an active session, Kindly login agian';
      return next(error);
    }

    const account = await Account.findById(accountId);
    if (account.user.toString() !== user.toString()) {
      const error = new Error();
      error.statusCode = 401;
      error.message = 'Unauthorized !';
      return next(error);
    }
    if (!account) {
      res.redirect('/app/accounts');
    } else {
      res.send(account);
    }
  },

  postEditAccount: async (req, res) => {
    const user = req.session.sessionToken
      ? req.session.sessionToken.user
      : null;
    const accountId = req.body.id;

    if (!user) {
      const error = new Error();
      error.statusCode = 400;
      error.message =
        'We are unable to find an active session, Kindly login agian';
      return next(error);
    }

    const account = {
      accountName: req.body.account.accountName,
      accountType: req.body.account.accountType,
      openingDate: req.body.account.openingDate,
      openingBalance: req.body.account.openingBalance
        ? parseFloat(req.body.account.openingBalance)
        : 0,
      currentBalance: parseFloat(req.body.account.currentBalance),
      defaultCurrency: req.body.account.currency,
      user,
    };

    try {
      const updatedAccount = await Account.findOneAndUpdate(
        {_id: accountId, user: user},
        account
      );
      if (!updatedAccount) {
        const error = new Error();
        error.statusCode = 400;
        error.message = "Ohh, That didn't Worker, Please try again";
        return next(error);
      }
      return res.redirect('/app/accounts');
    } catch (err) {
      const error = new Error();
      error.statusCode = 400;
      error.message = err;
      return next(error);
    }
  },
};
