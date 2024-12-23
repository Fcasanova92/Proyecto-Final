export const styleErrorField = (message, id, type, button) => {
  const errorMessageLabel = document.querySelector('label[for=send]');

  button.innerHTML = type === 'login' ? 'Login' : 'Register';

  const inputError = document.getElementById(`${id}`);

  button.disabled = false;

  if (inputError) {
    inputError.style.borderColor = '#EF5350';

    errorMessageLabel.style.display =
      inputError.id === `${id}` ? 'flex' : 'none';
  }

  errorMessageLabel.innerHTML = message;

  errorMessageLabel.style.color = 'red';

  setTimeout(() => {
    errorMessageLabel.style.display = 'none';
    inputError.style.borderColor = ' #ccc';
    inputError.id === `${id}` ? 'none' : 'flex';
  }, 2000);
};
