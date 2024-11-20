import { updateCartQuantity } from "./updateCartQuantity.js";

export const deleteProducInCart = async (e) => {

    e.preventDefault();

    const idProductToDelete = e.currentTarget.getAttribute('data-id');

    const itemProduct = document.querySelector(`li.product-item[id="${idProductToDelete}"]`)

    const response = await fetch(`/api/carts/1/products/${idProductToDelete}`, {
        method:'DELETE'
    });

    if(response.ok){

        const data = await response.json();

        await updateCartQuantity();

        itemProduct.remove();

        alert(data.message)

      
    } else {
        console.error("Error al obtener los productos del carrito.");
    }
    };
