import { loginComponent } from './componentesUsers.js';

export const loadUserComponent = async (user) => {
  try {
    // Crear un nuevo <li> que contendrá el nuevo contenido
    const newNode = document.createElement('div');
    newNode.classList = 'sub-menu';

    // Insertar el contenido del loginComponent en el nuevo <li>
    newNode.innerHTML = loginComponent;

    // Encontrar el enlace de login (el <a> original) dentro de la lista y reemplazarlo
    const loginLink = user.querySelector('.loginIcon'); // Seleccionamos el <a> de login dentro del <li>

    if (loginLink) {
      // Reemplazar el <a> por un <div> (creamos el div aquí)
      const loginDiv = document.createElement('div');
      loginDiv.classList.add('loginIcon');
      loginDiv.innerHTML = '<i class="fa-solid fa-user"></i><span>Login</span>';

      // Añadir el listener de clic para insertar el componente del login
      loginDiv.addEventListener('click', async () => {
        // Aquí colocamos el contenido del loginComponent cuando se hace clic en el div
        const loginContentContainer = document.querySelector(
          '#loginContentContainer'
        );
        loginContentContainer.innerHTML = loginComponent;
      });

      // Reemplazar el <a> por el <div> dentro del <li>
      loginLink.parentNode.replaceChild(loginDiv, loginLink);
    }

    // Reemplazar el viejo nodo de usuario por el nuevo que contiene el loginComponent
    user.parentNode.replaceChild(newNode, user);
  } catch (error) {
    console.error('Error al cargar el componente HTML:', error);
  }
};
