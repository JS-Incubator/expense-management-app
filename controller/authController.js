const DBUser = require('../models/user');
const {signupValidator} = require('../validation/userValidators');
const {ErrorHandler} = require('../helpers/error');
const {hashPwd} = require('../helpers/hasher');
const {generateToken} = require('../helpers/token');

module.exports = {
  //Sign-in Handler
  getSignupHandler: (req, res) => {
    res.render('auth/sign-up', {pageTitle: 'Sign-up'});
  },

  //Signup- Controller
  postSignupHandler: async (req, res, next) => {
    try {
      // const error = await signupValidator(req.body);
      // if (error) {
      //   throw new ErrorHandler(400, error.details[0].message);
      //   return;
      // }

      const isUser = await DBUser.findOne({username: req.body.username});
      if (isUser) {
        throw new ErrorHandler(
          400,
          'User already exist, Please login or Use reset password to create a password.'
        );
        return;
      }

      const {hash, salt} = hashPwd(req.body.password);

      const user = await DBUser.create({
        username: req.body.username,
        email: req.body.email,
        password: hash,
        salt: salt,
      });

      const token = await generateToken({id: user._id});
      user.password = undefined;
      user.salt = undefined;
      user.__v = undefined;

      res.redirect('/app/dashboard');
    } catch (err) {
      next(err);
    }
  },
};
