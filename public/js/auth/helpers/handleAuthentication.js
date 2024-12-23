import {
  resetButtonState,
  updateButtonState,
} from '../../form/styleUtils/styleButton.js';
import { styleErrorField } from '../../form/styleUtils/styleFieldError.js';
import { responseSelector } from '../adapters/responseSelector.js';
import { redirectUrlFailed } from './redirectUrlFailed.js';
import { redirectUrlSucces } from './redirectUrlSucces.js';

export const handleAuthentication = async (formData) => {
  const { data, type } = formData;
  try {
    const button = document.querySelector(`button[data-id="${type}"]#send`);

    updateButtonState(button, type);

    const response = await responseSelector(type, data);

    setTimeout(async () => {
      button.disabled = true;
      if (response.status) {
        redirectUrlSucces(type);
        if (type === 'resend') {
          alert('Codigo Enviado');
        }
      } else {
        const message = response.message;

        const fieldIdError = response.id;

        styleErrorField(message, fieldIdError, type, button);

        resetButtonState(button, type);

        redirectUrlFailed(type, message);
      }
    }, 3000);
  } catch (error) {
    console.error('Error during login:', error);
  }
};
