import fs from 'fs';

export const saveProduct = async (product, path, action) => {
    try {
        await fs.promises.access(`${path}/db/product.json`).catch(async () => {
            await fs.promises.writeFile(`${path}/db/product.json`, JSON.stringify([], null, 2));
        });

        await fs.promises.writeFile(`${path}/db/product.json`, JSON.stringify(product, null, 2));
        return { status: true, message: `Se logró ${action} correctamente el producto.` };
    } catch (error) {
        return { status: false, message: `Error al ${action} los productos: ${error.message}` };
    }
};

export const getAllProduct = async (path) => {
    try {
        const productJson = JSON.parse(await fs.promises.readFile(`${path}/db/product.json`, "utf-8"));
        return productJson;
    } catch (error) {
        return { status: false, message: `Error al obtener los productos: ${error.message}` };
    }
};

export const getProductById = async (id, path) => {
    try {
        if (!id) {
            return { status: false, message: "No se ingresó un ID válido" };
        }

        const idProduct = parseInt(id, 10);
        const products = JSON.parse(await fs.promises.readFile(`${path}/db/product.json`, "utf-8"));

        const product = products.find(product => product.id === idProduct);
        if (!product) {
            return { status: false, message: `El producto con ID ${idProduct} no se encuentra disponible` };
        }
        return product;
    } catch (error) {
        return { status: false, message: `Error al obtener el producto: ${error.message}` };
    }
};