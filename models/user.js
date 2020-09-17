const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 6,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: 255,
      min: 6,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    salt: {
      type: String,
      required: true,
    },
    resetPasswordToken: {
      type: String,
      default: null,
    },
    profileImage: {
      type: String,
      default: '/public/images/default-profile-image.png',
    },
  },
  {timestamps: true}
);

module.exports = mongoose.model('User', UserSchema);
