import { getValidateDataform } from '../../form/validateForm.js';
import { handleAuthentication } from './handleAuthentication.js';

export const authValidateAndRedirect = async (event) => {
  const formData = getValidateDataform(event);

  if (formData) {
    await handleAuthentication(formData);
  }
};
