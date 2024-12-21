import {
  resetButtonState,
  updateButtonState,
} from '../../form/styleUtils/styleButton.js';
import { styleErrorField } from '../../form/styleUtils/styleFieldError.js';
import { responseSelector } from '../adapters/responseSelector.js';
import { redirectUrl } from './redirectURL.js';

export const handleAuthentication = async (formData) => {
  const { data, type } = formData;
  try {
    const button = document.getElementById('send');
    updateButtonState(button, type);

    const response = await responseSelector(type, data);

    setTimeout(async () => {
      button.disabled = true;
      if (response.status) {
        redirectUrl(type);
      } else {
        const message = response.message;

        const fieldIdError = response.id;

        styleErrorField(message, fieldIdError, type, button);
        console.log(type)
        resetButtonState(button, type);
      }
    }, 3000);
  } catch (error) {
    console.error('Error during login:', error);
  }
};
