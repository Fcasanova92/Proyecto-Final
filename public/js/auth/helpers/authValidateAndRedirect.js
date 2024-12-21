import { getValidateDataform } from '../../form/utilities/validateForm.js';
import { handleAuthentication } from './handleAuthentication.js';

export const authValidateAndRedirect = async (event) => {
  try {
    const formData = getValidateDataform(event);

    if (formData) {
      await handleAuthentication(formData);
    }
  } catch (error) {
    console.log(error);
  }
};
