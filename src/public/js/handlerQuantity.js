export const handlerQuantity = async ({target}) => {


    const idProduct = target.dataset.id

    const quantity = document.querySelector(`p[data-id='${idProduct}']`);

    let quantityProduct = parseInt((quantity.textContent).split(': ')[1]);

    const idButton = target.id

    switch (idButton) {
        case "increase":
            quantityProduct+=1
    
            break;
    
        case "decrease":
            quantityProduct-=1
  
            break;

            
    }

    if(quantityProduct<1){
        quantity.textContent = `Cantidad: 1`;

        return
    }
    
    quantity.textContent = `Cantidad: ${quantityProduct}`;

    const response = await fetch(`/api/carts/1/products/${idProduct}`, {
        method:"PUT",
        headers: {
            'Content-Type': 'application/json', 
        },
        body:JSON.stringify({ 
            quantity: quantityProduct
        })
    })

    if(response.ok){

        await response.json()

        alert("Se modifico la cantidad del producto")
    }


}