import {dirname} from "path"
import { fileURLToPath } from "url";
import { saveProduct, getAllProduct, getProductById } from "./db/helpers/dbQuerys.js";

const requiredFields = new Set(['title', 'description', 'code', 'price', 'status', 'stock', 'category', 'thumbnails']);

export class ProductManager {

    constructor(){

        this.path = dirname(fileURLToPath(import.meta.url))

    }

    async addProduct(producto) {
      try {

          const productFieldKeys = new Set(Object.keys(producto)); 
  
          for (const field of requiredFields) {
              if (!productFieldKeys.has(field) || producto[field] === '') {
                  throw new Error(`El campo "${field}" es obligatorio.`);
              }
          }
  
          const products = await getAllProduct(this.path);

          const existCodeProduct = products.some((obj) => obj.code === producto.code);
  
          if (existCodeProduct) {
              throw new Error("El codigo del producto debe de ser único");
          }

          const ids = products.map((product) => product.id);

          const lastIdProduct = ids.length > 0 ? Math.max(...ids) : 0;

          const productId = lastIdProduct + 1;
  
          const newProduct = { id: productId, ...producto };

          console.log(newProduct)

          products.push(newProduct);
  
          return await saveProduct(products, this.path, "guardar");
  
      } catch (error) {
          throw error
      }
  }

  async getAll() {
    try {
        const products = await getAllProduct(this.path);
        if(products.length === 0){

            throw new Error("No hay productos disponibles")
        }
        return products
    } catch (error) {
        throw error
    }
}

  async getById(id) {
  try {
      const product = await getProductById(id, this.path);
     
      return product;
  } catch (error) {
        throw error
  }
}
  async deleteProduct(id) {
  try {
        
      const productExists = await getProductById(id, this.path);

      const products = await getAllProduct(this.path);

      const deletedProducts = products.filter((product) => product.id !== productExists.id);

      return await saveProduct(deletedProducts, this.path, "borrar")

     

  } catch (error) {
    // Podemos retornar un mensaje genérico o específico
        throw error
  }
}

 async updateProduct(id, updateField) {
    try {
        const updateFieldKeys = new Set(Object.keys(updateField));
        for (const field of requiredFields) {
            if (!updateFieldKeys.has(field)) {
                throw new Error(`El campo "${field}" no es propio del producto.`);
            }
        }
        const productById = await getProductById(id, this.path);

        const products = await getAllProduct(this.path);

        const updatedProduct = { ...productById, ...updateField };

        const updatedProducts = products.map((product) => {
            if (product.id === updatedProduct.id) {
                return updatedProduct;
            }
            return product;

        });

        return await saveProduct(updatedProducts, this.path, "actualizar")

    } catch (error) {
       throw error
    }
}}



