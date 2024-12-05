export const setForm = (inputs, messageSendForm, button) => {
  setTimeout(() => {
    button.disabled = false;

    button.innerHTML = 'Enviar';

    messageSendForm.style.display = 'none';

    inputs.map((input) => {
      input.value = '';

      input.style.borderColor = '#ccc';
    });
  }, 2000);
};
