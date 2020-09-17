/* Select dom elements*/
const elements = {
  backdrop: document.querySelector('.modal-backdrop'),
  modalContainer: document.querySelector('.modal-container'),
  formCancel: document.getElementById('form-cancel'),
  addAccountBtn: document.getElementById('add-account'),
  addAccountActionButton: document.getElementById('add-account-action-button'),
  addAccountForm: document.getElementById('add-account-form'),
  editAccountIcons: document.querySelectorAll('.edit-account-icon'),
  modalHeader: document.querySelector('.modal-header'),
  accountName: document.getElementById('accountName'),
  accountType: document.getElementById('accountType'),
  openingDate: document.getElementById('openingDate'),
  openingBalance: document.getElementById('openingBalance'),
  currentBalance: document.getElementById('currentBalance'),
  currency: document.getElementById('currency'),
};

/* Model handling functions*/
const handleModal = {
  displayModal: (elem) => {
    //Toggle show and hide classes
    elements.backdrop.classList.toggle('show-backdrop');
    elements.backdrop.classList.toggle('hide-backdrop');
    elements.modalContainer.classList.toggle('show-modal');
    elements.modalContainer.classList.toggle('hide-modal');

    //Run Materialize functions for form inputs
    let elems = document.querySelectorAll('.datepicker');
    let instances = M.Datepicker.init(elems);
    let elems2 = document.querySelectorAll('select');
    let instances2 = M.FormSelect.init(elems2);
  },
  hideModal: (elem) => {
    //Toggle show and hide classes
    elements.backdrop.classList.remove('show-backdrop');
    elements.backdrop.classList.add('hide-backdrop');
    elements.modalContainer.classList.remove('show-modal');
    elements.modalContainer.classList.add('hide-modal');
    elements.modalHeader.textContent = 'Add New Account';
    elements.addAccountBtn.textContent = 'Add Account';

    //Re-establsh form action to add product
    elements.addAccountForm.setAttribute('action', `/app/account/add`);
    elements.addAccountBtn.setAttribute('type', 'submit');
    elements.accountName.value = '';
    elements.accountType.value = '';
    elements.openingDate.value = '';
    elements.openingBalance.value = '';
    elements.currentBalance.value = '';
    elements.currency.value = '';
  },
};

//Open modal window upon add new account action button
elements.addAccountActionButton.addEventListener('click', (event) => {
  handleModal.displayModal();
});

// Close the modal window, Click cancel button
elements.formCancel.addEventListener('click', (event) => {
  handleModal.hideModal();
});

// //Close the modal window, Press esc key
// elements.attachModal.addEventListener('keydown', (event) => {
//   console.log(event.keyCode);
//   if (event.keyCode === 27) {
//     handleModal.closeModal();

//   }
// });

//Close the modal window upon submitting the form
elements.addAccountForm.addEventListener('submit', (event) => {
  handleModal.hideModal();
});

//Send post request to backend
const postEditAccount = (event, accountId, data) => {
  event.preventDefault();
  axios({
    url: `/app/account/edit/:${accountId}`,
    method: 'post',
    data: {
      account: data,
      id: accountId,
    },
  }).then((response) => {
    handleModal.hideModal();
    axios.get('/app/accounts');
    window.location.reload();
  });
};

//Open the edit account modal window on edit icon click
for (const icon of elements.editAccountIcons) {
  icon.addEventListener('click', (event) => {
    event.preventDefault();
    const accountId = icon.dataset.accountId;
    elements.modalHeader.textContent = 'Edit Account';
    elements.addAccountBtn.textContent = 'Ok';
    elements.addAccountBtn.setAttribute('id', 'edit-account');
    elements.addAccountBtn.setAttribute('type', 'button');
    elements.addAccountForm.setAttribute('action', ``);
    const editAccountBtn = document.getElementById('edit-account');

    axios
      .get(`/app/account/edit/${accountId}`)
      .then((response) => {
        const account = response.data;
        elements.accountName.value = account.accountName;
        elements.accountType.value = account.accountType;
        elements.openingDate.value = account.openingDate;
        elements.openingBalance.value = account.openingBalance;
        elements.currentBalance.value = account.currentBalance;
        elements.currency.value = account.defaultCurrency;
        return response.data;
      })
      .then((data) => {
        handleModal.displayModal();
        editAccountBtn.addEventListener('click', (event) => {
          newAccountData = {
            accountName: elements.accountName.value,
            accountType: elements.accountType.value,
            openingDate: elements.openingDate.value,
            openingBalance: elements.openingBalance.value,
            currentBalance: elements.currentBalance.value,
            defaultCurrency: elements.currency.value,
          };
          postEditAccount(event, accountId, newAccountData);
          editAccountBtn.setAttribute('id', 'add-account');
        });
      });
  });
}
