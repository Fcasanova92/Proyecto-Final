export const redirectUrlFailed = (type, error) => {
  let url = '';
  if (
    type === 'login' &&
    error === 'No has validado el codigo de registracion'
  ) {
    url = '/auth/verify-user';
    setTimeout(() => {
      window.location.href = url;
    }, 2000);
  }
};
