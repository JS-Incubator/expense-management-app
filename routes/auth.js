const router = require('express').Router();
const {
  postSignup,
  getAuth,
  postSignIn,
  postLogOut,
} = require('../controller/authController');

//@desc Render the auth screen for login and sign-up
//@route GET /
router.get('/', getAuth);

//@desc Render the sign-up screen
//@route GET /auth/sign-up
router.post('/sign-up', postSignup);

//@desc Sign-up new user
//@route POST /auth/sign-up
router.post('/log-in', postSignIn);

//@desc Logout users
//@route post /auth/logout
router.post('/log-out', postLogOut);

module.exports = router;
