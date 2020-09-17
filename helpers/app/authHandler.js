const elements = {
  registerBtn: document.getElementById('register-btn'),
  loginBtn: document.getElementById('login-btn'),
  registerForm: document.getElementById('register-form'),
  loginForm: document.getElementById('login-form'),
  headerBtns: document.querySelectorAll('.header-btn'),
  formContents: document.querySelectorAll('.form-content'),
  authContainer: document.querySelector('.auth-container'),
};

elements.registerBtn.addEventListener('click', (event) => {
  elements.registerForm.classList.toggle('form-hide');
  elements.loginForm.classList.toggle('form-hide');

  for (const headerBtn of elements.headerBtns) {
    headerBtn.classList.toggle('active');
  }

  // elements.authContainer.classList.toggle('register-height');
  // elements.authContainer.classList.toggle('login-height');
});

elements.loginBtn.addEventListener('click', (event) => {
  elements.loginForm.classList.toggle('form-hide');
  elements.registerForm.classList.toggle('form-hide');

  for (const headerBtn of elements.headerBtns) {
    headerBtn.classList.toggle('active');
  }

  // elements.authContainer.classList.toggle('register-height');
  // elements.authContainer.classList.toggle('login-height');
});
