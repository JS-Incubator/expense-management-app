/* Select dom elements*/
const elements = {
  backdrop: document.querySelector('.modal-backdrop'),
  modalContainer: document.querySelector('.modal-container'),
  formCancel: document.getElementById('form-cancel'),
  addAccount: document.getElementById('add-account'),
  addAccountActionButton: document.getElementById('add-account-action-button'),
  addAccountForm: document.getElementById('add-account-form'),
};

/* Model handling functions*/
const handleModal = {
  clickAddAccountActionBtn: (elem) => {
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
  toggleModal: (elem) => {
    //Toggle show and hide classes
    elements.backdrop.classList.toggle('show-backdrop');
    elements.backdrop.classList.toggle('hide-backdrop');
    elements.modalContainer.classList.toggle('show-modal');
    elements.modalContainer.classList.toggle('hide-modal');
  },
  // addAccount: (formData) => {
  //   axios
  //     .post('/app/account/add')
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .then((data) => {
  //       this.toggleModal();
  //     });
  // },
};

//Open modal window upon add new account action button
elements.addAccountActionButton.addEventListener('click', (event) => {
  handleModal.clickAddAccountActionBtn();
});

// Close the modal window, Click cancel button
elements.formCancel.addEventListener('click', (event) => {
  handleModal.toggleModal();
});

// //Close the modal window, Press esc key
// elements.attachModal.addEventListener('keydown', (event) => {
//   console.log(event.keyCode);
//   if (event.keyCode === 27) {
//     handleModal.closeModal();
//   }
// });

// //Post new account data to back-end
elements.addAccountForm.addEventListener('submit', (event) => {
  handleModal.toggleModal();
});
