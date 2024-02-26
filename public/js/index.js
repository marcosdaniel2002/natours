import '@babel/polyfill';
import { login, logout } from './login';
import { displayMap } from './mapbox';

console.log('Hello from parcelllllssssl');

const mapBox = document.getElementById('map');

if (mapBox) {
  const locations = JSON.parse(document.getElementById('map').dataset.locations);
  displayMap(locations);
}

const loginForm = document.querySelector('.form');

if (loginForm) {
  window.addEventListener('load', function () {
    document.getElementById('email').value = 'admin@natours.io';
    document.getElementById('password').value = 'test1234';
  });

  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login({ email, password });
  });
}

const logOutBtn = document.querySelector('.nav__el--logout');

if (logOutBtn) {
  logOutBtn.addEventListener('click', logout);
}
