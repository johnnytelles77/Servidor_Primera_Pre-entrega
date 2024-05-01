import { Router } from "express";
import ProductManager from "../managers/product-manager.js";

const router = Router();

const productManager = new ProductManager("./src/data/products.json");

router.get("/", async (req, res) => {
  try {
    const { limit } = req.query;
    const products = await productManager.getProducts(limit);
    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}); 

router.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productManager.getProductById(parseInt(pid));
    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.post("/", async (req, res) => {
  try {
    const product = req.body;
    const newProduct = await productManager.addProduct(product);
    return res.status(201).json(newProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.put("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const product = req.body;
    const updateProduct = await productManager.updateProduct(pid, product);
    return res.status(200).json(updateProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    await productManager.deleteProduct(pid);
    return res.status(201).json({ message: "Producto eliminado" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

export default router;
