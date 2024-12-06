export const updateButtonState = (button, type) => {
  button.innerHTML = `<span class="loader"></span> ${type === 'login' ? 'Login ... ' : ' Register and Login ...'}`;

  button.disabled = true;
};

export const resetButtonState = (button, type) => {
  button.innerHTML = `<span class="loader"></span> ${type === 'login' ? 'Login' : 'Register'}`;

  button.disabled = false;
};
