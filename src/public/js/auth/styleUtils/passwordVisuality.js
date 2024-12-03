export const passwordVisuality = ({ target }) => {
  const password = document.querySelector('#password');
  if (password.type === 'password') {
    password.type = 'text';
    target.classList.value = 'fa-regular fa-eye trigger-b';
  } else {
    password.type = 'password';
    target.classList.value = 'fa-regular fa-eye-slash trigger-b';
  }
};
