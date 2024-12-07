import {
  resetButtonState,
  updateButtonState,
} from '../../form/styleUtils/styleButton.js';
import { styleErrorField } from '../../form/styleUtils/styleFieldError.js';
import { login } from '../adapters/login.js';
import { register } from '../adapters/register.js';
import { loginRedirect } from './loginAndRedirect.js';

export const handleAuthentication = async (formData) => {
  const { data, type } = formData;

  try {
    const button = document.getElementById('send');
    updateButtonState(button, type);
    const response =
      type === 'login' ? await login(data) : await register(data);

    setTimeout(async () => {
      button.disabled = true;
      if (response.status) {
        loginRedirect();
      } else {
        const message = response.message;

        const fieldIdError = response.id;

        styleErrorField(message, fieldIdError, type, button);

        resetButtonState(button, type);
      }
    }, 3000);
  } catch (error) {
    console.error('Error during login:', error);
  }
};
