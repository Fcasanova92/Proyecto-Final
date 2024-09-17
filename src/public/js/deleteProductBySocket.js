

export const deleteProductBySocket = async (productId) => {
    const response = await fetch(`http://localhost:8080/api/products/${productId}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
    }

    return response.message
};
