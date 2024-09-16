export const getProducts = async () => {

    const response = await fetch("http://localhost:8080/api/products/");

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const productJson = await response.json();

        return productJson.products
}


