const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
  accountName: {
    type: String,
    required: true,
  },
  accountType: {
    type: String,
    required: true,
  },
  openingDate: {
    type: Date,
    required: true,
  },
  openingBalance: {
    type: Number,
    required: true,
    default: 0,
  },
  currentBalance: {
    type: Number,
    required: true,
  },
  defaultCurrency: {
    type: String,
    required: true,
  },
  //   user: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'User',
  //   },
});

module.exports = mongoose.model('Account', AccountSchema);
