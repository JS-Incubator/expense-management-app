const mongoose = require('mongoose');

const SubCategorySchema = new mongoose.Schema(
  {
    subCategory: {
      subCategoryName: { type: String, required: true },
      mainCategory: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'MainCategory',
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

module.exports = mongoose.model('SubCategory', SubCategorySchema);
