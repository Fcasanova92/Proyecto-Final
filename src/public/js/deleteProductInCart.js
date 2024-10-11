export const deleteProducInCart = async (e) => {

    e.preventDefault();

    const idProductToDelete = e.currentTarget.getAttribute('data-id');

    const response = await fetch(`/api/carts/1/products/${idProductToDelete}`, {
        method:'DELETE'
    });

    if(response.ok){

        const data = await response.json();

        alert(data.message)

        location.reload();

      
    } else {
        console.error("Error al obtener los productos del carrito.");
    }
    };
