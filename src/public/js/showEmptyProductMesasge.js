export const showMessageEmptyProduct = () => {
  const messageEmptyCart = document.querySelector('.messageEmptyCart');

  if (messageEmptyCart) {
    messageEmptyCart.style.display = 'block';
  }
};
