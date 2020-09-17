const mongoose = require('mongoose');

const MainCategorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
    },
    incExpType: {
      type: String, //[ENUM]
      required: true,
      enum: ['income', 'expense', 'transfer'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {timestamps: true}
);

module.exports = mongoose.model('MainCategory', MainCategorySchema);
