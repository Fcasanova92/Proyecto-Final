import { loadUserComponent, loadUserinfo } from '../../user/index.js';
document.addEventListener('DOMContentLoaded', async function () {
  const user = document.querySelector('.loginIcon');
  try {
    const response = await fetch('/api/auth/current');
    const { data } = await response.json();
    if (response.status === 200) {
      await loadUserComponent(user);
      loadUserinfo(data);
    }
    if (response.status === 401) {
      console.error(data.message);
    }
  } catch (error) {
    console.error('Error durante la verificación del token:', error);
  }
});
