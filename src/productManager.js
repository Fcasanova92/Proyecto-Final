import {dirname} from "path"
import { fileURLToPath } from "url";
import { saveProduct, getAllProduct, getProductById } from "./db/helpers/dbQuerys.js";
import { error } from "console";

class ProductManager {

    #id;

    static nextId = 1;

    constructor(){

        this.path = dirname(fileURLToPath(import.meta.url))

    }

    async addProduct(producto){
        try {

            // agregarlo en un middleware

            const requiredFields = ['title', 'description', 'code', 'price', 'status', 'stock', 'category', 'thumbnails' ];

            for (const field of requiredFields) {

              if (!producto.hasOwnProperty(field) || producto[field] === '') {

                throw new Error(`El campo "${field}" es obligatorio.`);
              }
            }

            const products = await getAllProduct(this.path)

            const existCodeProduct = products.some((obj) => obj.code === producto.code);

            if(existCodeProduct){

                throw new Error("El codigo del producto debe de ser unico")
            }

            this.#id = ProductManager.nextId++

            const newProduct = {

                    id:this.#id,
                     ...producto
        
                }

            products.push(newProduct)
        
            await saveProduct(products, this.path)
            
            
        } catch (error) {

            console.error(error)
            
        }

    }

    async getProducts(){

      try {

        const products = await getAllProduct(this.path)

        console.log(products)
        
      } catch (error) {

        console.error(error)
        
      }

    }

   async getProductById(id){

        try {

            const productById = await getProductById(id, this.path)

            if(!productById){

                throw new Error("el id del producto no existe")
            }

            console.log(productById)

            return productById
            
        } catch (error) {
            
            console.error(error)
        }
        
        
    }

    deleteProductById(){}

    async updateProduct(id){

      try {
        const productById = await getProductById(id, this.path)

        const products = getAllProduct(this.path)

        productById.price = 5000

        const updatedProducts = products.map((product) => {
          if (product.id === productById.id) {
            return productById; // Devuelve el producto actualizado
          }
          return product; // Devuelve el producto sin cambios
        });
       
        await saveProduct(updatedProducts, this.path)
        
      } catch (error) {

        console.error(error)
        
      }

    }
}

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
    await product.addProduct(producto1);
    await product.addProduct(producto2);
    await product.addProduct(producto3);
  

    await product.updateProduct(1)
    await product.getProducts();
    
  }
  
  run();



