import { showAlert } from './alerts';

export const updateSettings = async function (formData, type) {
  try {
    const url = type === 'password' ? '/api/v1/users/updateMyPassword' : '/api/v1/users/updateMe';
    const res = await fetch(url, {
      method: 'PATCH',
      body: formData,
    });

    const data = await res.json();
    if (data.status === 'success') {
      return showAlert('success', `${type.toUpperCase()} user successfully`);
    }

    if (data.status !== 'success') {
      throw new Error(data.message);
    }
  } catch (err) {
    showAlert('error', err.message);
  }
};
