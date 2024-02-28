import { showAlert } from "./alerts";

export const updateSettings = async function(formData, type) {
    try {
        console.log(formData);
        const url = type === 'password' ? 'http://127.0.0.1:3000/api/v1/users/updateMyPassword' : 'http://127.0.0.1:3000/api/v1/users/updateMe'
        const res = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })

        const data = await res.json();

        if (data.status === 'success') {
            return showAlert('success', `${type.toUpperCase()} user successfully`);
        }

        if(data.status !== 'success') {
            throw new Error(data.message);
        }

    } catch(err) {
        showAlert('error', err.message);
    }
}