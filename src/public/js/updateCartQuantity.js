export const updateCartQuantity = async () => {
    const quantityElement = document.querySelector('.quantityProduct');

    const response = await fetch('/api/carts/1');

    if(response.ok){

        const data = await response.json();

        quantityElement.textContent = data.products.length;

    }
    
};
