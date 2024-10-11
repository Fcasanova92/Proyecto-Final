export const handlerProductInCart = async ({target}) => {
    const idProduct = target.dataset.id
    const response = await fetch(`/api/carts/1/products/${idProduct}`, {
        method:'PATCH',
    })

    if (response.ok) {
        const data = await response.json();
        alert(data.message);
        location.reload();
    } else {
        console.error("Error en la actualización del carrito");
    }

}