export const handlerProductInCart = async ({target}) => {
    const idProduct = target.dataset.id
    const response = await fetch(`/api/carts/1/products/${idProduct}`, {
        method:'PATCH',
    })

    if (response.ok) {
        const data = await response.json(); // Convertir la respuesta a JSON
        alert(data.message); // Acceder al mensaje enviado desde el servidor
        location.reload();
    } else {
        console.error("Error en la actualización del carrito");
    }

}