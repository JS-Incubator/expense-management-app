const User = require('../models/user');
const {ErrorHandler} = require('../helpers/error');
const {hashPwd, decryptPwd} = require('../helpers/hasher');

module.exports = {
  //Sign-in Handler
  getAuth: (req, res) => {
    res.render('auth/auth', {pageTitle: 'Welcome'});
  },

  //Signup- Controller
  postSignup: async (req, res, next) => {
    try {
      const user = await User.findOne({username: req.body.email});
      if (user) {
        throw new ErrorHandler(
          400,
          'This email id is already taken, Try different email id.'
        );
      }

      const {hash, salt} = hashPwd(req.body.password);

      await User.create({
        username: req.body.username,
        email: req.body.email,
        password: hash,
        salt: salt,
      }).then((user) => {
        req.session.sessionToken = {
          user: user._id,
          isAuthenticated: true,
        };
        res.redirect('/app/dashboard');
      });
    } catch (error) {
      return next(error);
    }
  },
  postSignIn: async (req, res, next) => {
    try {
      const user = await User.findOne({email: req.body.email});
      if (!user) {
        throw new ErrorHandler(400, "Sorry we couldn't find this email id");
      }
      const hashPwd = await decryptPwd(user.salt, req.body.password);
      if (user.password !== hashPwd) {
        throw new ErrorHandler(400, 'Password does not match');
      }
      req.session.sessionToken = {
        user: user._id,
        isAuthenticated: true,
      };
      res.redirect('/app/dashboard');
    } catch (error) {
      return next(error);
    }
  },
  postLogOut: (req, res, next) => {
    req.session.destroy();
    res.redirect('/');
  },
};
