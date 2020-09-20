/* Select dom elements */
const elements = {
  // General modal and form related
  addAccountActionButton: document.getElementById('add-account-action-button'), // Action button trigger the modal
  backdrop: document.querySelector('.modal-backdrop'), // select backdrop
  modalContainer: document.querySelector('.modal-container'), // Modal parent container
  modalHeader: document.querySelector('.modal-header'), // Modal header

  // For input and btn related elements
  accountName: document.getElementById('accountName'),
  accountType: document.getElementById('accountType'),
  openingDate: document.getElementById('openingDate'),
  openingBalance: document.getElementById('openingBalance'),
  currentBalance: document.getElementById('currentBalance'),
  formCancelBtn: document.getElementById('form-cancel'),
  addAccountFormBtn: document.getElementById('add-account-submit-btn'),
  editAccountFormBtn: document.getElementById('edit-account-submit-btn'),

  // Edit account related elements
  editAccountBtns: document.querySelectorAll('.edit-account-btn'),
};

/* Model handling functions */
const handleModal = {
  // Toggle show and hide classes
  displayModal: () => {
    elements.backdrop.classList.toggle('show-backdrop');
    elements.backdrop.classList.toggle('hide-backdrop');
    elements.modalContainer.classList.toggle('show-modal');
    elements.modalContainer.classList.toggle('hide-modal');
  },
  // Toggle show and hide classes upon submiting the form, clicking cancel button
  hideModal: () => {
    elements.backdrop.classList.remove('show-backdrop');
    elements.backdrop.classList.add('hide-backdrop');
    elements.modalContainer.classList.remove('show-modal');
    elements.modalContainer.classList.add('hide-modal');
  },
  resetForm: () => {
    // Empty the input feilds
    elements.accountName.value = '';
    elements.accountType.value = '';
    elements.openingDate.value = '';
    elements.openingBalance.value = '';
    elements.currentBalance.value = '';

    // Resetting the modal header and button text to default
    elements.modalHeader.textContent = 'Add new account';

    // Resetting the add account button and hidding the edit account button
    elements.addAccountFormBtn.classList.add('button-visible');
    elements.addAccountFormBtn.classList.remove('button-hidden');
    elements.editAccountFormBtn.classList.add('button-hidden');
    elements.editAccountFormBtn.classList.remove('button-visible');
  },
  // Send post request to backend
  sendPostRequest: (urlAction, accountId, data) => {
    axios({
      url: urlAction,
      method: 'post',
      data: {
        account: data,
        id: accountId,
      },
    }).then((response) => response);
  },
};

// Open modal window upon clicking the add new account action button
elements.addAccountActionButton.addEventListener('click', () => {
  handleModal.displayModal();
});

// Close the modal window, Click cancel button
elements.formCancelBtn.addEventListener('click', () => {
  handleModal.hideModal();
  handleModal.resetForm();
});

// Re-evaluate input values
const accountData = () => ({
  accountName: elements.accountName.value,
  accountType: elements.accountType.value,
  openingDate: elements.openingDate.value,
  openingBalance: elements.openingBalance.value,
  currentBalance: elements.currentBalance.value,
});

// Submit the new account details upon clicking the formSubmitBtn
elements.addAccountFormBtn.addEventListener('click', async () => {
  await handleModal.sendPostRequest('/app/account/add', null, accountData());
  window.location.reload();
  handleModal.hideModal();
  handleModal.resetForm();
});

// POST : Edit Account
const postEditAccount = async (accountId) => {
  await handleModal.sendPostRequest(
    `/app/account/edit/${accountId}`,
    accountId,
    accountData()
  );
  window.location.reload();
  handleModal.hideModal();
  handleModal.resetForm();
};

// GET and POST : Get and submit the updated account details upon clicking edit account button in edit form
for (const editBtn of elements.editAccountBtns) {
  editBtn.addEventListener('click', () => {
    // Prepare the edit form
    elements.modalHeader.textContent = 'Edit Account';
    elements.addAccountFormBtn.classList.add('button-hidden');
    elements.addAccountFormBtn.classList.remove('button-visible');
    elements.editAccountFormBtn.classList.add('button-visible');
    elements.editAccountFormBtn.classList.remove('button-hidden');

    const { accountId } = editBtn.dataset;
    axios({
      url: `/app/account/edit/${accountId}`,
      method: 'get',
    })
      .then((response) => {
        const account = response.data;
        // Set the value feilds upon receiving the account data
        elements.accountName.value = account.accountName;
        elements.accountType.value = account.accountType;
        elements.openingDate.value = account.openingDate;
        elements.openingBalance.value = account.openingBalance;
        elements.currentBalance.value = account.currentBalance;
        return account;
      })
      .then(() => {
        handleModal.displayModal();
        // Submit the new account details upon clicking the formSubmitBtn
        elements.editAccountFormBtn.addEventListener('click', () => {
          postEditAccount(accountId);
        });
      });
  });
}
