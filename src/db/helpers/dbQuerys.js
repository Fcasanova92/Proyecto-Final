import fs from 'fs';

export const saveProduct = async (product, path) => {
  try {
      await fs.promises.access(`${path}/db/product.json`).catch(async () => {
          // Si el archivo no existe, se crea con un array vacío
          await fs.promises.writeFile(`${path}/db/product.json`, JSON.stringify([], null, 2));
      });

      await fs.promises.writeFile(`${path}/db/product.json`, JSON.stringify(product, null, 2));
      return true;
  } catch (error) {
      throw new Error(`Error al guardar los productos: ${error.message}`);
  }
};

export const getAllProduct = async (path) => {
  try {
      const productJson = JSON.parse(await fs.promises.readFile(`${path}/db/product.json`, "utf-8"));

      if (!Array.isArray(productJson) || productJson.length === 0) {
          throw new Error("No hay productos disponibles");
      }
      return productJson;
  } catch (error) {
      throw error;
  }
};

export const getProductById = async (id, path) => {
  try {
      if (!id) {
          throw new Error("No se ingresó un ID válido");
      }

      const idProduct = parseInt(id, 10);
      const products = JSON.parse(await fs.promises.readFile(`${path}/db/product.json`, "utf-8"));

      const product = products.find(product => product.id === idProduct);
      if (!product) {
          throw new Error("El producto no se encuentra disponible");
      }
      return product;
  } catch (error) {
    throw error;
  }
};