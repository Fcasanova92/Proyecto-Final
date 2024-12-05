import { errors } from '../errors/errorTypes.js';
import { validateCheckbox } from '../utilities/validateCheckbox.js';

export const getValidateDataform = (event) => {
  event.preventDefault();

  const formType = event.target.getAttribute('data-id');

  const inputsArray = Array.from(
    document.querySelectorAll(`[data-form='${formType}']`)
  );

  const checkbox = document.querySelector('#condition');

  fieldRequiredOnClick(inputsArray);

  const data = validateDataForm(inputsArray);

  switch (formType) {
    case 'register':
      const checkboxValidate = validateCheckbox(checkbox);

      console.log(checkboxValidate);

      if (data && checkboxValidate) {
        return { data, type: formType, inputsArray };
      }

      break;

    case 'login':
      if (data) {
        return { data, type: formType, inputsArray };
      }
      break;

    case 'contact':
      if (data) {
        return { data, type: formType, inputsArray };
      }
      break;
  }
};

const validateDataForm = (inputsArray) => {
  let dataInput = {};

  inputsArray.map((input) => {
    const validateInput = JSON.parse(input.getAttribute('data-validate'));

    if (validateInput) {
      dataInput[input.id] = input.value;
    }
  });

  if (Object.values(dataInput).length === inputsArray.length) {
    return dataInput;
  }
};

const fieldRequiredOnClick = (inputsArray) => {
  const { empty } = errors;

  inputsArray.map((input) => {
    const { id, value } = input;

    const alertValidate = document.querySelector(`label[for=${id}]`);

    if (value.length === 0) {
      input.style.borderColor = '#EF5350';

      input.setAttribute('data-validate', 'false');

      alertValidate.innerHTML = empty;

      alertValidate.style.color = '#EF5350';

      alertValidate.style.display = 'flex';
    }
  });
};
