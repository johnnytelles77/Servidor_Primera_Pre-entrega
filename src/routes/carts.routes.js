import { Router } from "express";
import CartManager from "../managers/cartManager.js"; 

const router = Router();


const cartManager = new CartManager("./src/data/carts.json");

router.post("/", async (_req, res) => {
  try {
    const newCart = await cartManager.createCart();
    return res.status(201).json(newCart); // Devuelve el carrito creado
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartManager.getCartById(cid); // Devuelve el carrito por su ID

    if (cart) {
      return res.status(200).json(cart);
    } else {
      res.status(404).json({ error: "No se encontró el carrito" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cart = await cartManager.addProductToCart(cid, pid); // Agregar producto al carrito

    res.status(201).json(cart);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
});

export default router;

