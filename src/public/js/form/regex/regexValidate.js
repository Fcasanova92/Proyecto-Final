export const regexValidate = (regex, value) => {
  if (value.length !== 0 && !regex.test(value)) {
    return false;
  }
  return true;
};
