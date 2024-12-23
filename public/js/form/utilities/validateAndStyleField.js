import { regexValidate } from '../regex/regexValidate.js';

export const handleAuthenticationError = (
  regex,
  value,
  error,
  alertValidate,
  inputSelected,
  empty
) => {
  if (value.length === 0 && inputSelected.getAttribute('id') !== 'code') {
    showValidationError(inputSelected, alertValidate, empty, '#EF5350');
  } else if (regexValidate(regex, value)) {
    hideValidationError(inputSelected, alertValidate, '#23DC3D');
  } else {
    showValidationError(inputSelected, alertValidate, error, '#EF5350');
  }
};

const showValidationError = (input, alert, message, color) => {
  input.style.borderColor = color;
  input.setAttribute('data-validate', 'false');
  alert.innerHTML = message;
  alert.style.color = color;
  alert.style.display = 'flex';
};

const hideValidationError = (input, alert, color) => {
  alert.style.display = 'none';
  input.setAttribute('data-validate', 'true');
  input.style.borderColor = color;
};
