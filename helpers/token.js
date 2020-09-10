const JWT = require('jsonwebtoken');

module.exports = {
  generateToken: (obj) => {
    const token = JWT.sign(obj, process.env.JWT_KEY, {expiresIn: '24h'});
    return token;
  },

  compare: (token) => {
    const status = JWT.verify(token);

    return status;
  },
};
