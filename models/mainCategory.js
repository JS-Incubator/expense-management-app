const mongoose = require('mongoose');

const MainCategorySchema = new mongoose.Schema(
  {
    mainCategory: {
      mainCategoryName: { type: String, required: true },
      categoryType: {
        type: String,
        required: true,
        enum: ['income', 'expense', 'transfer'],
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('MainCategory', MainCategorySchema);
