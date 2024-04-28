import { Router } from "express";
import CartManager from "../managers/cartManager.js";

const router = Router();

/// Ruta para crear un nuevo carrito
router.post("/", async (req, res) => {
  try {
    const cart = await CartManager.createCart();

    res.status(201).json(cart); /// Devuelve el carrito creado 
  } catch (error) {
    console.log(error);
  }
});

/// Ruta para crear un carrito por su ID
router.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await CartManager.getCartById(cid); /// Devuelve el carrito

    res.status(201).json(cart);
  } catch (error) {
    console.log(error);
  }
});

/// Ruta para agregar producto al carrito
router.post("/:cid/product/:pid", async (req, res) => {
    try {
      const {cid, pid} = req.params;
      const cart = await CartManager.addProductToCart(cid, pid); /// Agregar producto al carrito
  
      res.status(201).json(cart);
    } catch (error) {
      console.log(error);
    }
  });

export default router;
