import fs from 'fs';

export const saveProduct = async (product, path) => {
  try {
      await fs.promises.access(`${path}/db/product.json`).catch(async () => {
          // Si el archivo no existe, se crea con un array vacío
          await fs.promises.writeFile(`${path}/db/product.json`, JSON.stringify([], null, 2));
      });

      await fs.promises.writeFile(`${path}/db/product.json`, JSON.stringify(product, null, 2));
  } catch (error) {
      throw new Error(`Error al guardar los productos: ${error.message}`);
  }
};

export const getAllProduct = async (path) => {
  try {
      const productJson = await fs.promises.readFile(`${path}/db/product.json`, "utf-8");
      return JSON.parse(productJson);
  } catch (error) {
      throw new Error(`Error al obtener todos los productos: ${error.message}`);
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
      throw new Error(`Error al obtener el producto por ID: ${error.message}`);
  }
};

