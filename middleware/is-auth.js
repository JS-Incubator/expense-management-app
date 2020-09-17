module.exports = {
  isAuthenticated: (req, res, next) => {
    if (
      !req.session.sessionToken ||
      !req.session.sessionToken.isAuthenticated
    ) {
      return res.redirect('/');
    }
    next();
  },
};
