export const updateCartQuantity = async () => {
    const quantityElement = document.querySelector('.quantityProductInCart');

    const totalPrice = document.querySelector('.total-price');

    const response = await fetch('/api/carts/1');

    if(response.ok){

        const data = await response.json();

        quantityElement.textContent = data.products.length;

        data.products.forEach((prod)=>{
            const productList = document.getElementById(prod.idProduct);
            if (productList) {
         
                const quantityProductElement = productList.querySelector('.quantity');
                const priceProductElement = productList.querySelector('.priceProduct');
                console.log(priceProductElement)

                if (quantityProductElement) {
                    // Actualizamos el texto de la cantidad en el HTML
                    quantityProductElement.textContent = `Cantidad: ${prod.quantity}`;
                    totalPrice.textContent = prod.price * prod.quantity
                }
            }
        });
    } else {
        console.error("Error al obtener los productos del carrito.");
    }
    };
