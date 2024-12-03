import {
  resetButtonState,
  updateButtonState,
} from '../styleUtils/styleButton.js';
import { styleErrorField } from '../styleUtils/styleErrorField.js';
import { login, register } from '../../../../adapters/auth/index.js';
import { loginRedirect } from './index.js';

export const handleAuthentication = async (formData) => {
  const { data, type } = formData;

  const button = document.getElementById('send');

  updateButtonState(button, type);

  try {
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
      }
    }, 3000);
  } catch (error) {
    console.error('Error during login:', error);
  } finally {
    resetButtonState(button, type);
  }
};
