import '@babel/polyfill';
import { login, logout } from './login';
import { displayMap } from './mapbox';
import { updateSettings } from './updateSettings';
import { bookTour } from './stripe';
import { showAlert } from './alerts';

console.log('Hello from parcel!');

const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const logOutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const bookButton = document.getElementById('book-tour');

if (mapBox) {
  const locations = JSON.parse(document.getElementById('map').dataset.locations);
  displayMap(locations);
}

if (loginForm) {
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login({ email, password });
  });
}

if (logOutBtn) {
  logOutBtn.addEventListener('click', logout);
}

if (userDataForm) {
  userDataForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const photo = document.getElementById('photo').files[0];

    const form = new FormData();
    form.append('name', name);
    form.append('email', email);
    form.append('photo', photo);
    updateSettings(form, 'data');
  });
}

if (userPasswordForm) {
  userPasswordForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const btnSubmit = document.querySelector('.btn--save-password');
    const formPassword = document.getElementById('password-current');
    const formNewPassword = document.getElementById('password');
    const formNewPasswordConfirm = document.getElementById('password-confirm');

    btnSubmit.textContent = 'Updating...';

    const password = formPassword.value;
    const newPassword = formNewPassword.value;
    const newPasswordConfirm = formNewPasswordConfirm.value;
    await updateSettings({ password, newPassword, newPasswordConfirm }, 'password');

    btnSubmit.textContent = 'Save password';
    formPassword.value = '';
    formNewPassword.value = '';
    formNewPasswordConfirm.value = '';
  });
}

if (bookButton) {
  bookButton.addEventListener('click', async function (e) {
    e.target.textContent = 'Processing...';
    const { tourId } = e.target.dataset;
    await bookTour(tourId);
  });
}

const alertMessage = document.querySelector('body').dataset.alert;
if (alertMessage) showAlert('success', alertMessage, 20);
