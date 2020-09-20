const MainCategory = require('../models/mainCategory');
const SubCategory = require('../models/subCategory');

module.exports = {
  getCategories: async (req, res, next) => {
    const user = req.session.sessionToken
      ? req.session.sessionToken.user
      : null;

    if (!user) {
      const error = new Error();
      error.statusCode = 400;
      error.message =
        'We are unable to find an active session, Kindly login agian';
      return next(error);
    }
    try {
      const mainCategories = await MainCategory.find({ user });
      const subCategories = await SubCategory.find({ user });

      res.render('app/category-mgt', {
        pageTitle: 'Category Management',
        pageHeader: 'Manage your expense and income categories',
        mainCategories,
        subCategories,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  postAddMainCat: async (req, res, next) => {
    const user = req.session.sessionToken
      ? req.session.sessionToken.user
      : null;

    if (!user) {
      const error = new Error();
      error.statusCode = 400;
      error.message =
        'We are unable to find an active session, Kindly login agian';
      return next(error);
    }
    const category = {
      mainCategory: {
        mainCategoryName: req.body.data.name,
        categoryType: req.body.data.type,
      },
      user,
    };
    try {
      await MainCategory.create(category);
      res.send(category);
    } catch (err) {
      const error = new Error();
      error.statusCode = 400;
      error.message = err;
      return next(error);
    }
  },
  postAddSubCat: async (req, res, next) => {
    const user = req.session.sessionToken
      ? req.session.sessionToken.user
      : null;

    if (!user) {
      const error = new Error();
      error.statusCode = 400;
      error.message =
        'We are unable to find an active session, Kindly login agian';
      return next(error);
    }
    const category = {
      subCategory: {
        subCategoryName: req.body.data.name,
        mainCategory: req.body.data.mainCatId,
      },
      user,
    };

    try {
      await SubCategory.create(category);
      res.send(category);
    } catch (err) {
      const error = new Error();
      error.statusCode = 400;
      error.message = err;
      return next(error);
    }
  },
  getEditMain: async (req, res, next) => {
    const user = req.session.sessionToken
      ? req.session.sessionToken.user
      : null;
    const mainCatId = req.params.id;

    if (!user) {
      const error = new Error();
      error.statusCode = 400;
      error.message =
        'We are unable to find an active session, Kindly login agian';
      return next(error);
    }

    const mainCategory = await MainCategory.findById(mainCatId);
    if (mainCategory.user.toString() !== user.toString()) {
      const error = new Error();
      error.statusCode = 401;
      error.message = 'Unauthorized !';
      return next(error);
    }
    if (!mainCategory) {
      res.redirect('/app/categories');
    } else {
      res.send(mainCategory);
    }
  },
  postEditMain: async (req, res, next) => {
    const user = req.session.sessionToken
      ? req.session.sessionToken.user
      : null;
    const mainCatId = req.body.id;

    if (!user) {
      const error = new Error();
      error.statusCode = 400;
      error.message =
        'We are unable to find an active session, Kindly login agian';
      return next(error);
    }
    const category = {
      mainCategory: {
        mainCategoryName: req.body.data.name,
        categoryType: req.body.data.type,
      },
      user,
    };
    try {
      const updatedCategory = await MainCategory.findOneAndUpdate(
        { _id: mainCatId, user },
        category
      );
      if (!updatedCategory) {
        const error = new Error();
        error.statusCode = 400;
        error.message = "Ohh, That didn't Worker, Please try again";
        return next(error);
      }
      return res.send(category);
    } catch (err) {
      const error = new Error();
      error.statusCode = 400;
      error.message = err;
      return next(error);
    }
  },

  getEditSub: async (req, res, next) => {
    const user = req.session.sessionToken
      ? req.session.sessionToken.user
      : null;
    const subCatId = req.params.id;

    if (!user) {
      const error = new Error();
      error.statusCode = 400;
      error.message =
        'We are unable to find an active session, Kindly login agian';
      return next(error);
    }

    const subCategory = await SubCategory.findById(subCatId).populate(
      'subCategory.mainCategory'
    );

    if (subCategory.user.toString() !== user.toString()) {
      const error = new Error();
      error.statusCode = 401;
      error.message = 'Unauthorized !';
      return next(error);
    }
    if (!subCategory) {
      res.redirect('/app/categories');
    } else {
      res.send(subCategory);
    }
  },
  postEditSub: async (req, res, next) => {
    const user = req.session.sessionToken
      ? req.session.sessionToken.user
      : null;
    const subCatId = req.body.id;

    if (!user) {
      const error = new Error();
      error.statusCode = 400;
      error.message =
        'We are unable to find an active session, Kindly login agian';
      return next(error);
    }

    const category = {
      subCategory: {
        subCategoryName: req.body.data.name,
        mainCategory: req.body.data.mainCatId,
      },
      user,
    };

    try {
      const updatedCategory = await SubCategory.findOneAndUpdate(
        { _id: subCatId, user },
        category
      );
      if (!updatedCategory) {
        const error = new Error();
        error.statusCode = 400;
        error.message = "Ohh, That didn't Worker, Please try again";
        return next(error);
      }
      return res.redirect('/app/categories');
    } catch (err) {
      const error = new Error();
      error.statusCode = 400;
      error.message = err;
      return next(error);
    }
  },
};
