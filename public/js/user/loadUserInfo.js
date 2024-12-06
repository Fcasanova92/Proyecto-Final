export const loadUserinfo = (data) => {
  const name = document.querySelector('#name');
  const surname = document.querySelector('#surname');

  if (name && surname) {
    name.innerHTML = data.username;
    surname.innerHTML = data.surname;
  } else {
    console.error('Elementos de nombre y apellido no encontrados');
  }
};
