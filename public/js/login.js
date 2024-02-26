const login = async function (credentials) {
  try {
    const res = await fetch('http://127.0.0.1:3000/api/v1/users/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await res.json();
    console.log(data);
  } catch (e) {
    console.error(e);
  }
};

window.addEventListener('load', function () {
  document.getElementById('email').value = 'admin@natours.io';
  document.getElementById('password').value = 'test1234';
});

document.querySelector('.form').addEventListener('submit', function (e) {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  login({ email, password });
});
