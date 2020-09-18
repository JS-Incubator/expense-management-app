/* Select dom elements*/
const elements = {
  //General modal and form related elements
  addAccountActionButton: document.getElementById('add-account-action-button'), //Action button trigger the modal
  backdrop: document.querySelector('.modal-backdrop'), //select backdrop
  modalContainer: document.querySelector('.modal-container'), //Modal parent container
  modalHeader: document.querySelector('.modal-header'), //Modal header

  //For input and btn related elements
  accountName: document.getElementById('accountName'),
  accountType: document.getElementById('accountType'),
  openingDate: document.getElementById('openingDate'),
  openingBalance: document.getElementById('openingBalance'),
  currentBalance: document.getElementById('currentBalance'),
  defaultCurrency: document.getElementById('defaultCurrency'),
  formCancelBtn: document.getElementById('form-cancel'),
  formSubmitBtn: document.getElementById('form-submit'),

  //Edit account related elements
  editAccountBtns: document.querySelectorAll('.edit-account-btn'),
};

/* Model handling functions*/
const handleModal = {
  //Toggle show and hide classes
  displayModal: (elem) => {
    elements.backdrop.classList.toggle('show-backdrop');
    elements.backdrop.classList.toggle('hide-backdrop');
    elements.modalContainer.classList.toggle('show-modal');
    elements.modalContainer.classList.toggle('hide-modal');
  },
  //Toggle show and hide classes upon submiting the form, clicking cancel button
  hideModal: (elem) => {
    elements.backdrop.classList.remove('show-backdrop');
    elements.backdrop.classList.add('hide-backdrop');
    elements.modalContainer.classList.remove('show-modal');
    elements.modalContainer.classList.add('hide-modal');

    //Empty the input feilds
    elements.accountName.value = '';
    elements.accountType.value = '';
    elements.openingDate.value = '';
    elements.openingBalance.value = '';
    elements.currentBalance.value = '';
    elements.defaultCurrency.value = '';

    //Resetting the modal header and button text to default
    elements.modalHeader.textContent = 'Add new account';
    elements.formSubmitBtn.textContent = 'Add account';
    elements.formSubmitBtn.dataset.editing = '';
  },
  //Send post request to backend
  sendPostRequest: (urlAction, accountId, data) => {
    axios({
      url: urlAction,
      method: 'post',
      data: {
        account: data,
        id: accountId,
      },
    }).then((response) => {
      window.location.reload();
      handleModal.hideModal();
      //Resetting the modal header and button text to default
      elements.modalHeader.textContent = 'Add new account';
      elements.formSubmitBtn.textContent = 'Add account';
      elements.formSubmitBtn.dataset.editing = '';
    });
  },
};

//Open modal window upon clicking the add new account action button
elements.addAccountActionButton.addEventListener('click', (event) => {
  handleModal.displayModal();
});

// Close the modal window, Click cancel button
elements.formCancelBtn.addEventListener('click', (event) => {
  handleModal.hideModal();
});

//Re-evaluate input values
const accountData = () => {
  let accountData = {
    accountName: elements.accountName.value,
    accountType: elements.accountType.value,
    openingDate: elements.openingDate.value,
    openingBalance: elements.openingBalance.value,
    currentBalance: elements.currentBalance.value,
    defaultCurrency: elements.defaultCurrency.value,
  };
  return accountData;
};

//Submit the new account details upon clicking the formSubmitBtn
elements.formSubmitBtn.addEventListener('click', (event) => {
  handleModal.sendPostRequest('/app/account/add', null, accountData());
});

//Submit the updated account details upon clicking the formSubmitBtn on edit form
for (const editBtn of elements.editAccountBtns) {
  editBtn.addEventListener('click', () => {
    elements.modalHeader.textContent = 'Edit Account';
    elements.formSubmitBtn.textContent = 'Update Account';
    const accountId = editBtn.dataset.accountId;
    axios({
      url: `/app/account/edit/${accountId}`,
      method: 'get',
    })
      .then((response) => {
        const accountData = response.data;
        //Set the value feilds upon receiving the account data
        elements.accountName.value = accountData.accountName;
        elements.accountType.value = accountData.accountType;
        elements.openingDate.value = accountData.openingDate;
        elements.openingBalance.value = accountData.openingBalance;
        elements.currentBalance.value = accountData.currentBalance;
        elements.defaultCurrency.value = accountData.defaultCurrency;
        return accountData;
      })
      .then((data) => {
        handleModal.displayModal();
        //Submit the new account details upon clicking the formSubmitBtn
        elements.formSubmitBtn.addEventListener('click', (event) => {
          handleModal.sendPostRequest(
            `/app/account/edit/${accountId}`,
            accountId,
            accountData()
          );
        });
      });
  });
}
