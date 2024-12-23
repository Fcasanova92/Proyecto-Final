export const redirectUrlSucces = (type) => {
  let url = '';
  switch (type) {
    case 'login':
      url = '/';
      break;

    case 'register':
      url = '/auth/verify';
      break;

    case 'verify':
      url = '/auth/login';
      break;
  }
  setTimeout(() => {
    window.location.href = url;
  }, 2000);
};
