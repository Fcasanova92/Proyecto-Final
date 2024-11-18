// esta funcion debe de tomar de las cookies 

export const updateCartQuantity = async () => {
    const quantityElement = document.querySelector('.quantityProductInCart');

    const cid = quantityElement.getAttribute('data-id') || 1

    const response = await fetch(`/api/carts/${cid}`);

    if(response.ok){

        const data = await response.json();

        quantityElement.textContent = data.products.length;

        data.products.forEach((prod)=>{
            const productList = document.getElementById(prod.idProduct);
            if (productList) {
         
                const quantityProductElement = productList.querySelector('.quantity');

                if (quantityProductElement) {
                    // Actualizamos el texto de la cantidad en el HTML
                    quantityProductElement.textContent = `Cantidad: ${prod.quantity}`;
                }
            }
        });
    } else {
        console.error("Error al obtener los productos del carrito.");
    }
    };
