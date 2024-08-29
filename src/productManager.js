import {dirname} from "path"
import { fileURLToPath } from "url";
import { saveProduct, getAllProduct, getProductById } from "./db/helpers/dbQuerys.js";


class ProductManager {

    constructor(){

        this.path = dirname(fileURLToPath(import.meta.url))

    }

    async addProduct(producto) {
      try {
          const requiredFields = ['title', 'description', 'code', 'price', 'status', 'stock', 'category', 'thumbnails'];
  
          for (const field of requiredFields) {
              if (!producto.hasOwnProperty(field) || producto[field] === '') {
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

          products.push(newProduct);
  
          await saveProduct(products, this.path);
  
      } catch (error) {
          throw new Error(`Error al agregar el producto: ${error.message}`);
      }
  }

  async getProducts() {
    try {
        const products = await getAllProduct(this.path);
        return products;
    } catch (error) {
        throw new Error(`Error al obtener los productos: ${error.message}`);
    }
}

  async getProductById(id) {
  try {
      const product = await getProductById(id, this.path);
      if (!product) {
          throw new Error("El id del producto no existe");
      }
      return product;
  } catch (error) {
      throw new Error(`Error al obtener el producto por ID: ${error.message}`);
  }
}
  async deleteProductById(id) {
  try {
      const productById = await getProductById(id, this.path);
      const products = await getAllProduct(this.path);

      const updatedProducts = products.filter((product) => product.id !== productById.id);

      await saveProduct(updatedProducts, this.path);
  } catch (error) {
      throw new Error(`Error al eliminar el producto por ID: ${error.message}`);
  }
}

 async updateProduct(id, updateField) {
    try {
        const productById = await getProductById(id, this.path);
        const products = await getAllProduct(this.path);

        const updatedProduct = { ...productById, ...updateField };

        const updatedProducts = products.map((product) => {
            if (product.id === updatedProduct.id) {
                return updatedProduct;
            }
            return product;
        });

        await saveProduct(updatedProducts, this.path);
    } catch (error) {
        throw new Error(`Error al actualizar el producto: ${error.message}`);
    }
}}

const producto1 = {
    title: "Cámara Digital 1K",
    description: "Una cámara digital avanzada con capacidad de grabación en 4K y conectividad Wi-Fi.",
    code: "CAM1233",
    price: 499.99,
    status: "Disponible",
    stock: 25,
    category: "Electrónica",
    thumbnails: [
      "https://example.com/images/camara_digital_1.jpg",
      "https://example.com/images/camara_digital_2.jpg"
    ]
  };

  const producto2 = {
    title: "Cámara Digital 4K",
    description: "Una cámara digital avanzada con capacidad de grabación en 4K y conectividad Wi-Fi.",
    code: "CAM1231",
    price: 499.99,
    status: "Disponible",
    stock: 25,
    category: "Electrónica",
    thumbnails: [
      "https://example.com/images/camara_digital_1.jpg",
      "https://example.com/images/camara_digital_2.jpg"
    ]
  };

  const producto3 = {
    title: "Cámara Digital 4K",
    description: "Una cámara digital avanzada con capacidad de grabación en 4K y conectividad Wi-Fi.",
    code: "CAM1235",
    price: 499.99,
    status: "Disponible",
    stock: 25,
    category: "Electrónica",
    thumbnails: [
      "https://example.com/images/camara_digital_1.jpg",
      "https://example.com/images/camara_digital_2.jpg"
    ]
  };
  
  const product = new ProductManager();
  
  async function run() {
    // await product.addProduct(producto1);
    // await product.addProduct(producto2);
    await product.addProduct(producto3);
  

    // await product.deleteProductById(2)
    await product.getProducts();
    

    
  }
  
  run();



