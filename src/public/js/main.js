import { validateInput } from './form/utilities/validateInput.js';
import { passwordVisuality } from './auth/styleUtils/passwordVisuality.js';
import { authValidateAndRedirect } from './auth/helpers/authValidateAndRedirect.js';

document.getElementById('name').addEventListener('input', validateInput);
document.getElementById('surname').addEventListener('input', validateInput);
document.getElementById('email').addEventListener('input', validateInput);
document.getElementById('password').addEventListener('input', validateInput);
document.getElementById('eye').addEventListener('click', passwordVisuality);
document
  .getElementById('send')
  .addEventListener('click', authValidateAndRedirect);
