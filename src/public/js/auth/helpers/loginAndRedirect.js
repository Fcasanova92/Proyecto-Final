export const loginRedirect = () => {
  setTimeout(() => {
    sessionStorage.setItem('sesion', 'activa');

    window.location.href = '/*';
  }, 2000);
};
