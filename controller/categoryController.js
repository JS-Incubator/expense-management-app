module.exports = {
  getCategories: (req, res) => {
    res.render('app/category/category-mgt', {
      pageTitle: 'Category Management',
      pageHeader: 'Manage your expense and income categories',
    });
  },
  getAddMainCat: (req, res) => {},
  getAddSubCat: (req, res) => {},
  postAddMainCat: (req, res) => {},
  postAddSubCat: (req, res) => {},
};
