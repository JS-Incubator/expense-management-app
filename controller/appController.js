module.exports = {
  getDashboard: (req, res) => {
    res.render('app/dashboard', {pageTitle: 'Dashboard'});
  },
};
