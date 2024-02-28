import { showAlert } from './alerts';

export const login = async function (credentials) {
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

    if (data.status === 'success') {
      showAlert('success', 'Logged in successfully');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }

    if(data.status !== 'success') {
      throw new Error(data.message);
    }
  } catch (e) {
    showAlert('error', e.message);
  }
};

export const logout = async () => {
  try {
    const res = await fetch('http://127.0.0.1:3000/api/v1/users/logout');
    const data = await res.json();

    if (data.status === 'success') {
      location.reload(true);
    }
  } catch (err) {
    showAlert('error', 'Error loggin out! Try it again...');
  }
};
