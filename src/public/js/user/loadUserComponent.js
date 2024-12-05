import { loginComponent } from './componentesUsers.js';

export const loadUserComponent = async (user) => {
  try {
    const newNode = document.createElement('li');
    newNode.classList = 'sub-menu';

    newNode.innerHTML = loginComponent;

    user.parentNode.replaceChild(newNode, user);
  } catch (error) {
    console.error('Error al cargar el componente HTML:', error);
  }
};
