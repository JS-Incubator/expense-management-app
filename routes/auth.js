const router = require('express').Router();
const {
  postSignupHandler,
  getSignupHandler,
} = require('../controller/authController');

//@desc Render the sign-up screen
//@route GET /auth/sign-up
router.get('/sign-up', getSignupHandler);

//@desc Sign-up new user
//@route POST /auth/sign-up
router.post('/sign-up', postSignupHandler);

module.exports = router;
