export const regexTypes = {
  text: /^[a-zA-Z]+$/,
  email: /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
  password: /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,}$/,
  telephone: /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/,
  consulta: /^[a-zA-Z0-9\s]+$/,
  code: /^[a-zA-Z0-9]{6}$/,
};
