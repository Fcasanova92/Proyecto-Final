import { logout } from '../auth/adapters/logout.js';

export const loadUserinfo = (data) => {
  const nameElement = document.querySelector('#name');
  const logoutElement = document.querySelector('.logout');
  if (nameElement) {
    nameElement.innerHTML = data.first_name;
    logoutElement.addEventListener('click', logout);
  } else {
    console.error('Elementos de nombre y apellido no encontrados');
  }
};
