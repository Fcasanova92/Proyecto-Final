import { regexTypes } from '../regex/regexTypes.js';
import { errors } from '../errors/errorTypes.js';
import { handleAuthenticationError } from './validateAndStyleField.js';

export const validateInput = ({ target }) => {
  const { id, value } = target;
  const { text, telephone, email, consulta, password } = regexTypes;
  const { textError, telephoneError, emailError, passwordError, empty } =
    errors;

  const inputSelected = document.querySelector(`input[id=${id}]`);
  const alertValidate = document.querySelector(`label[for=${id}]`);

  const config = {
    email: { regex: email, error: emailError },
    telephone: { regex: telephone, error: telephoneError },
    name: { regex: text, error: textError },
    surname: { regex: text, error: textError },
    consulta: { regex: consulta, error: textError },
    password: { regex: password, error: passwordError },
  };

  const { regex, error } = config[id] || {};
  if (regex) {
    handleAuthenticationError(
      regex,
      value,
      error,
      alertValidate,
      inputSelected,
      empty
    );
  }
};
