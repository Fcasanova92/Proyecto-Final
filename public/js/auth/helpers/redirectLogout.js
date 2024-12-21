export const redirectLogout = () => {
  setTimeout(() => {
    window.history.replaceState(
      {},
      document.title,
      (window.location.href = '/')
    );
  }, 200);
};
