export const updateButtonState = (button, type) => {
  button.innerHTML = `<span class="loader"></span> ${type === 'verify' ? 'Verify ...' : type === 'login' ? 'Login ... ' : ' Register...'}`;

  button.disabled = true;
};

export const resetButtonState = (button, type) => {
  button.innerHTML = `<span class="loader"></span>  ${type === 'verify' ? 'Verify' : type === 'login' ? 'Login ' : ' Register'}`;

  button.disabled = false;
};
