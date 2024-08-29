
class CartsManager {

    #id;

    static nextId = 1;

    constructor(path){

        this.path = path ;

        this.products = []

    }

    addProduct(producto){

        console.log("el path es", path)

        try {

            // agregarlo en un middleware

            const requiredFields = ['title', 'description', 'code', 'price', 'status', 'stock', 'category', 'thumbnails' ];

            for (const field of requiredFields) {

              if (!producto.hasOwnProperty(field) || producto[field] === '') {

                throw new Error(`El campo "${field}" es obligatorio.`);
              }
            }


            const existCodeProduct = this.products.some((obj) => obj.code === producto.code);

            if(existCodeProduct){

                throw new Error("El codigo del producto debe de ser unico")
            }

            this.#id = ProductManager.nextId++

                const newProduct = {
                    id:this.#id,
                     ...producto
        
                }
        
                this.products.push(newProduct)
            
            
        } catch (error) {

            console.error(error)
            
        }

    }

    getProduct(){

        console.log(this.products)

    }

    getProductById(id){

        try {

            const productById = this.products.find((obj)=>obj.id === id)

            if(!productById){

                throw new Error("el id del producto no existe")
            }

            return productById
            
        } catch (error) {
            
            console.error(error)
        }
        
        
    }

    deleteProductById(){}

    updateProduct(){
    }
}