import { validateInput } from './utilities/validateInput.js';
import { authValidateAndRedirect } from '../auth/helpers/authValidateAndRedirect.js';

document.getElementById('email').addEventListener('input', validateInput);
document
  .querySelector('[data-id="resend"], #resend')
  .addEventListener('click', authValidateAndRedirect);
