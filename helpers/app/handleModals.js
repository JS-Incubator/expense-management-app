const addAccountHTML = `
<div class="modal-container">
<div class="hide-backdrop"></div>
<h4 class="modal-header">Add New Account</h4>
<div class="form-container">
<form action="/app/account/add" method="POST">

<div class="row">
  <div class="input-field">
    <input
      class="validate"
      placeholder="Account Name"
      id="accountName"
      name="accountName"
      type="text"
    />
    <label for="accountName">Account Name</label>
  </div>
  </div>

  <div class="row">
  <div class="input-field">
    <select name="accountType" , id="accountType">
      <!--TODO: Need to generate dynamically -->
      <option value="Bank" selected>Bank</option>
      <option value="Cash">Cash</option>
      <option value="Receivables">Receivables</option>
      <option value="Credit Card">Credit Card</option>
      <option value="Loans">Loans</option>
    </select>
    <label for="accountType">Account Type</label>
  </div>
  </div>

  <div class="row">
  <div class="input-field">
    <input
      placeholder="Opening Date"
      id="openingDate"
      name="openingDate"
      type="text"
      class="datepicker col s12 validate"
    />
    <label for="openingData">Opening Date</label>
  </div>
  </div>

  <div class="row">
  <div class="input-field">
    <input
    placeholder="Opening Balance"
    id="openingBalance"
    name="openingBalance"
    type="text"
  />
  <label for="openingBalance">Opening Balance</label>
  </div>
  </div>

  <div class="row">
  <div class="input-field">
    <input
    placeholder="Current Balance"
    id="currentBalance"
    name="currentBalance"
    type="text"
  />
  <label for="currentBalance">Current Balance</label>
  </div>
  </div>

  <div class="row">
  <div class="input-field">
    <div class="input-field col s12">
      <select name="currency" id="currency">
        <!--TODO: Need to generate dynamically -->
        <option value="US Dollers" selected>US Dollers</option>
        <option value="Canadian Dollers">Canadian Dollers</option>
      </select>
      <label for="defaultCurrency">Default Currency</label>
  </div>
  </div>

  <div class="row">
  <div class="right-align">
    <button type="button" class="waves-effect waves-red red btn" id="form-cancel">
      Cancel
    </button>
    <button type="submit" class="waves-effect waves-geen btn add-account" id="add-account">
      Add Account
    </button>
  </div>
  </div>
</form>
</div>
</div>
`;

/* Select dom elements*/
const elements = {
  attachModal: document.querySelector('.attach-modal'),
  addNewAccount: document.querySelector('.btn-floating'),
  formCancel: document.getElementById('form-cancel'),
  addAccount: document.getElementById('add-account'),
  modalContainer: document.querySelector('.modal-container'),
};

/* Materialize method for form controlls*/
elements.addNewAccount.addEventListener('click', () => {
  let elems = document.querySelectorAll('.datepicker');
  let instances = M.Datepicker.init(elems);
  let elems2 = document.querySelectorAll('select');
  let instances2 = M.FormSelect.init(elems2);
});

/* Model handling functions*/
const handleModal = {
  clickAddAccount: (elem) => {
    elements.attachModal.insertAdjacentHTML('afterbegin', addAccountHTML);
    elements.attachModal.classList.toggle('show-modal');
    elements.attachModal.classList.toggle('hide-modal');
  },
  closeModal: (elem) => {
    elements.attachModal.innerHTML = '';
    elements.attachModal.classList.remove('show-modal');
    elements.attachModal.classList.add('hide-modal');
  },
};

//Close the modal window, Click close button
elements.attachModal.addEventListener('click', (event) => {
  if (event.target.id === 'form-cancel' || event.target.id === 'attach-modal') {
    handleModal.closeModal();
  }
});

// //Close the modal window, Press esc key
// elements.attachModal.addEventListener('keydown', (event) => {
//   console.log(event.keyCode);
//   if (event.keyCode === 27) {
//     handleModal.closeModal();
//   }
// });
