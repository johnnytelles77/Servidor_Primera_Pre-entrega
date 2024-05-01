import fs from "fs";


class CartManager {
  constructor(path) {
    this.path = path
    this.carts = []; /// array vacio para el carrito
  }

  /// metodo para obtener los carriot desde el json 
  async getCarts() {
    const cartsJson = await fs.promises.readFile(this.path);
    this.carts = JSON.parse(cartsJson) || [];
    return this.carts;
  }

  async createCart() { /// creando un carrito nuevo 
    await this.getCarts();

    const newCart = {
      id: this.carts.length + 1, /// asigna un ID al carrito
      products: [],
    };

    this.carts.push(newCart); /// devuelve el carrito creado

    await fs.promises.writeFile(this.path, JSON.stringify(this.carts));

    return newCart; /// Devuelve un nuevo carrito
  }

  async getCartById(cid) { /// Metodo para obtener carrito por ID
    await this.getCarts(); /// Obtiene los carrito existentes

    const cart = this.carts.find((c) => c.id == cid); /// Busca carrito por ID 

    if (!cart) return `No se encuentra el carrito con el id ${cid}`; /// si no encuentra el carrito manda un mensaje

    return cart.products;  /// Devuelve los productos del carrito
  }

  /// agregar producto al carrito
  async addProductToCart(cid, pid) {
    await this.getCarts();

    const index = this.carts.findIndex((c) => c.id === cid);
    if (index === -1) return `No se encontró el carrito con el id ${cid}`;

    this.carts[index].products.push({
      product: pid,  /// Id del producto
      quantity: 1,
    });

    return this.carts[index];  /// Devuelve el carrtio actualizado
  }
}

export default CartManager;
