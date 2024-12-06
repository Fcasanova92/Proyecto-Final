import { validateInput } from './utilities/validateInput.js';
import { passwordVisuality } from '../form/styleUtils/passwordVisuality.js';
import { authValidateAndRedirect } from '../auth/helpers/authValidateAndRedirect.js';

document.getElementById('email').addEventListener('input', validateInput);
document.getElementById('password').addEventListener('input', validateInput);
document.getElementById('eye').addEventListener('click', passwordVisuality);
document
  .getElementById('send')
  .addEventListener('click', authValidateAndRedirect);
