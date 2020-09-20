// Selecting DOM elements
const elements = {
  // Selecting the modal and form elemts
  mainCatBackdrop: document.getElementById('main-cat-backdrop'),
  subCatBackDrop: document.getElementById('sub-cat-backdrop'),
  addMainCatActionBtn: document.getElementById('add-main-cat-btn'),
  addSubCatActionBtn: document.getElementById('add-sub-cat-btn'),
  mainCatModal: document.getElementById('main-cat-modal-container'),
  subCatModal: document.getElementById('sub-cat-modal-container'),
  mainCatmodalHeader: document.getElementById('main-cat-modal-header'),
  subCatmodalHeader: document.getElementById('sub-cat-modal-header'),

  // Selecting input and btn elements of main category form
  mainCategoryName: document.getElementById('mainCategoryName'),
  mainCategoryType: document.getElementById('mainCategoryType'),
  mainFormAddBtn: document.getElementById('main-cat-add-submit-btn'), // Two seperate buttons were used to trigger the click event
  mainFormEditBtn: document.getElementById('main-cat-edit-submit-btn'), // Two seperate buttons were used to trigger the click event
  mainFormCancelBtn: document.getElementById('main-cat-form-cancel'),
  mainCatEditBtns: document.querySelectorAll('.main-cat-edit-btn'),

  // Selecting input and btn elements of sub category form
  subCategoryName: document.getElementById('subCategoryName'),
  subFormAddBtn: document.getElementById('sub-cat-add-submit-btn'), // Two seperate buttons were used to trigger the click event
  subFormEditBtn: document.getElementById('sub-cat-edit-submit-btn'), // Two seperate buttons were used to trigger the click event
  subFormCancelBtn: document.getElementById('sub-cat-form-cancel'),
  subCatEditBtns: document.querySelectorAll('.sub-cat-edit-btn'),
  mainCategoryNameInSub: document.getElementById('mainCategoryInSub'),
};

// Model handling functions
const handleModal = {
  // Toggle show and hide classes
  displayModal: (elem) => {
    elem.backdrop.classList.toggle('show-backdrop');
    elem.backdrop.classList.toggle('hide-backdrop');
    elem.modal.classList.toggle('show-modal');
    elem.modal.classList.toggle('hide-modal');
  },
  // Toggle show and hide classes upon submiting the form, clicking cancel button
  hideModal: (elem) => {
    elem.backdrop.classList.remove('show-backdrop');
    elem.backdrop.classList.add('hide-backdrop');
    elem.modal.classList.remove('show-modal');
    elem.modal.classList.add('hide-modal');
  },
  // Reseting the main form to its default state
  resetMainForm: () => {
    elements.mainFormAddBtn.classList.add('button-visible');
    elements.mainFormAddBtn.classList.remove('button-hidden');
    elements.mainFormEditBtn.classList.add('button-hidden');
    elements.mainFormEditBtn.classList.remove('button-visible');
    elements.mainCategoryName.value = '';
    elements.mainCategoryType.value = 'expense';
    elements.mainCatmodalHeader.textContent = 'Add new main category';
  },
  resetSubForm: () => {
    elements.subFormAddBtn.classList.add('button-visible');
    elements.subFormAddBtn.classList.remove('button-hidden');
    elements.subFormEditBtn.classList.add('button-hidden');
    elements.subFormEditBtn.classList.remove('button-visible');
    elements.subCatmodalHeader.textContent = 'Add new sub category';
    elements.subCategoryName.value = '';
    elements.mainCategoryNameInSub.value = '';
  },
  // Send post request to backend
  sendPostRequest: (urlAction, id, data) => {
    axios({
      url: urlAction,
      method: 'post',
      data: {
        data,
        id,
      },
    }).then((response) => Promise.resolve(response));
  },
};

// Assigning main category modal and sub category modal to variables
const mainCategoryModal = {
  backdrop: elements.mainCatBackdrop,
  modal: elements.mainCatModal,
};
const subCategoryModal = {
  backdrop: elements.subCatBackDrop,
  modal: elements.subCatModal,
};

// * MAIN CATEGORY STARTS HERE =========================================

// Re-evaluate main category form input values
const mainCategoryData = () => ({
  name: elements.mainCategoryName.value,
  type: elements.mainCategoryType.value,
});

// Display the add new main category modal window upon clicking the add main action button
elements.addMainCatActionBtn.addEventListener('click', () => {
  handleModal.hideModal(subCategoryModal);
  handleModal.displayModal(mainCategoryModal);
});

// Hide the add new main category modal window upon clicking the cancel button
elements.mainFormCancelBtn.addEventListener('click', async () => {
  handleModal.hideModal(mainCategoryModal);
  handleModal.resetMainForm();
});

// POST : New main catergory
const postNewMainCategory = async () => {
  await handleModal.sendPostRequest(
    '/app/category/add-main',
    null,
    mainCategoryData()
  );
  window.location.reload();
  handleModal.hideModal(subCategoryModal);
  handleModal.resetMainForm();
};

// Attach event listner to main category form submit button
elements.mainFormAddBtn.addEventListener('click', postNewMainCategory);

// POST : Edit main category
const postEditMainCategory = async (mainCatId) => {
  await handleModal.sendPostRequest(
    `/app/category/edit-main/${mainCatId}`,
    mainCatId,
    mainCategoryData()
  );
  window.location.reload();
  handleModal.hideModal(mainCategoryModal);
  handleModal.resetMainForm();
};

// GET & POST : Edit Main Category, Attaching the even listners for all edit buttons
for (const mainCatEditBtn of elements.mainCatEditBtns) {
  mainCatEditBtn.addEventListener('click', () => {
    elements.mainCatmodalHeader.textContent = 'Edit Main Category';
    elements.mainFormAddBtn.classList.add('button-hidden');
    elements.mainFormAddBtn.classList.remove('button-visible');
    elements.mainFormEditBtn.classList.add('button-visible');
    elements.mainFormEditBtn.classList.remove('button-hidden');
    const { mainCatId } = mainCatEditBtn.dataset;
    axios({
      url: `/app/category/edit-main/${mainCatId}`,
      method: 'get',
    })
      .then((response) => {
        const category = response.data;
        // Set the value feilds upon receiving the account data
        elements.mainCategoryName.value =
          category.mainCategory.mainCategoryName;
        elements.mainCategoryType.value = category.mainCategory.categoryType;
        return category;
      })
      .then(() => {
        handleModal.displayModal(mainCategoryModal);
        // Submit the new account details upon clicking the formSubmitBtn
        elements.mainFormEditBtn.addEventListener('click', () =>
          postEditMainCategory(mainCatId)
        );
      });
  });
}

// * MAIN CATEGORY ENDS HERE ================================================================

// * SUB CATEGORY STARTS HERE ===============================================================

// Display the add new sub category modal window upon clicking the add sub action button
elements.addSubCatActionBtn.addEventListener('click', () => {
  handleModal.hideModal(mainCategoryModal);
  handleModal.displayModal(subCategoryModal);
});

// Hide the add new sub category modal window upon clicking the cancel button
elements.subFormCancelBtn.addEventListener('click', () => {
  handleModal.hideModal(subCategoryModal);
  handleModal.resetSubForm();
});

// Re-evaluate sub category input values
const subCategoryData = () => ({
  name: elements.subCategoryName.value,
  mainCatId: elements.mainCategoryNameInSub.dataset.mainCatId,
});

// POST : New sub catergory
const postNewSubCategory = async () => {
  await handleModal.sendPostRequest(
    '/app/category/add-sub',
    null,
    subCategoryData()
  );
  window.location.reload();
  handleModal.hideModal(subCategoryModal);
  handleModal.resetSubForm();
};

// Attach event listner to sub category form submit button
elements.subFormAddBtn.addEventListener('click', postNewSubCategory);

// POST : Edit sub category
const postEditSubCategory = async (subCatId) => {
  await handleModal.sendPostRequest(
    `/app/category/edit-sub/${subCatId}`,
    subCatId,
    subCategoryData()
  );
  window.location.reload();
  handleModal.hideModal(subCategoryModal);
  handleModal.resetSubForm();
};

// GET & POST : Edit Main Category, Attaching the even listners for all edit buttons
for (const subCatEditBtn of elements.subCatEditBtns) {
  subCatEditBtn.addEventListener(
    'click',
    () => {
      elements.subCatmodalHeader.textContent = 'Edit SUb Category';
      elements.subFormAddBtn.classList.add('button-hidden');
      elements.subFormAddBtn.classList.remove('button-visible');
      elements.subFormEditBtn.classList.add('button-visible');
      elements.subFormEditBtn.classList.remove('button-hidden');
      const { subcatId } = subCatEditBtn.dataset;
      axios({
        url: `/app/category/edit-sub/${subcatId}`,
        method: 'get',
      })
        .then((response) => {
          const category = response.data.subCategory;
          // Set the value feilds upon receiving the sub category
          elements.subCategoryName.value = category.subCategoryName;
          elements.mainCategoryNameInSub.value =
            category.mainCategory.mainCategory.mainCategoryName;
          return category;
        })
        .then(() => {
          handleModal.displayModal(subCategoryModal);
          // Submit the new account details upon clicking the formSubmitBtn
          elements.subFormEditBtn.addEventListener('click', () =>
            postEditSubCategory(subcatId)
          );
        });
    },
    true
  );
}
