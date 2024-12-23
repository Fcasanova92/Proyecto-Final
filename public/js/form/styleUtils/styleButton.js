export const updateButtonState = (button, type) => {
  switch (type) {
    case 'verify':
      button.innerHTML = '<span class="loader"></span> Verify ...';
      break;
    case 'login':
      button.innerHTML = '<span class="loader"></span> Login ...';
      break;
    case 'register':
      button.innerHTML = '<span class="loader"></span> Register...';
      break;
    case 'resend':
      button.innerHTML =
        '<span class="loader"></span> Enviando nuevo codigo...';
      break;
    default:
      button.innerHTML = 'Submit'; // Default case if none of the above
      break;
  }
};

export const resetButtonState = (button, type) => {
  switch (type) {
    case 'verify':
      button.innerHTML = '<span class="loader"></span> Verify';
      break;
    case 'login':
      button.innerHTML = '<span class="loader"></span> Login';
      break;
    case 'register':
      button.innerHTML = '<span class="loader"></span> Register';
      break;
    case 'resend':
      button.innerHTML = '<span class="loader"></span> Enviar nuevo codigo';
      break;
    default:
      button.innerHTML = 'Submit'; // Default case if none of the above
      break;
  }

  button.disabled = false;
};
