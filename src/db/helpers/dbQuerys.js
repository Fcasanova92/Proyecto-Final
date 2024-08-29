import fs from 'fs';

export const saveProduct = async (product, path) => {
    try {
  
      try {
        await fs.promises.access(`${path}/db/product.json`);
      } catch {
        // Si el archivo no existe, se crea con un array vacío
        await fs.promises.writeFile("./user.json", "{}");
      }

      await fs.promises.writeFile(`${path}/db/product.json`, JSON.stringify(product, null, 2));
  
    } catch (error) {
      console.error("ERROR", error.message);
    }
  };

  export const getAllProduct = async (path) => {
    try {

      const productJson = JSON.parse(await fs.promises.readFile(`${path}/db/product.json`, "utf-8"))

      return productJson
    
    } catch (error) {
      console.error("error", error.message);
    }
  };

    
export const getProductById = async (id, path) => {
    try {

        if(id === ""){

            throw new error("No se ingreso un id valido")
        }

      const idProduct = parseInt(id)      
      const productJson = JSON.parse(await fs.promises.readFile(path, "utf-8"));
      const productById = productJson[idProduct]
      return productById
    
    } catch (error) {
      console.error("error", error.message);
    }
  };

export const updateProduct = async (id, path) => {
    try {

        if(id === ""){

            throw new error("No se ingreso un id valido")
        }

      const idUser = parseInt(id)      
      const usersJson = JSON.parse(await fs.promises.readFile(path, "utf-8"));
      const {nombre, apellido} = usersJson[idUser]
      console.log(" El usuario buscado es : ", nombre, "", apellido)
    } catch (error) {
      console.error("error", error.message);
    }
  };

  export const deleteProduct = async (id, path) => {
    try {

        if(id === ""){

            throw new error("No se ingreso un id valido")
        }

      const idUser = parseInt(id)      
      const usersJson = JSON.parse(await fs.promises.readFile(path, "utf-8"));
      const {nombre, apellido} = usersJson[idUser]
      console.log(" El usuario buscado es : ", nombre, "", apellido)
    } catch (error) {
      console.error("error", error.message);
    }
  };