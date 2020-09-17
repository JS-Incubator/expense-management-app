const mongoose = require('mongoose');

const SubCategorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
    },
    mainCatogery: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MainCategory',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {timestamps: true}
);

module.exports = mongoose.model('SubCategory', SubCategorySchema);
