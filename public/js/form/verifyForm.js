import { validateInput } from './utilities/validateInput.js';
import { authValidateAndRedirect } from '../auth/helpers/authValidateAndRedirect.js';

document.getElementById('code').addEventListener('input', validateInput);
document
  .getElementById('send')
  .addEventListener('click', authValidateAndRedirect);
