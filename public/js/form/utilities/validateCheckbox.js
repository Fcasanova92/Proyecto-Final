export const validateCheckbox = (checkbox) => {
  const validate = checkbox.checked;

  if (!validate) {
    alert('Acepta los terminos y condiciones');
  }

  return validate;
};
