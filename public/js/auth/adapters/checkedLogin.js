import { loadUserComponent, loadUserinfo } from '../../pages/user/index.js';

document.addEventListener('DOMContentLoaded', async function checkedLogin() {
  const user = document.querySelector('#user-session');

  const token = sessionStorage.getItem('token');

  try {
    if (token) {
      const response = await axios.get('/api/auth/protected', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        await loadUserComponent(user);
        loadUserinfo(response.data);
      }
    }
  } catch (error) {
    console.error('Error durante la verificación del token:', error);
  }
});
