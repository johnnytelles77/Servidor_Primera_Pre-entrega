import { Router } from "express";
import ProductManager from "../managers/product-manager.js";

const router = Router();

const productManager = new ProductManager("./src/data/products.json");


router.get("/", async (req, res) => {
  try {
    console.log("Obteniendo todos los productos...");
    const { limit } = req.query;
    const products = await productManager.getProducts(limit);
    console.log("Productos obtenidos:", products);
    return res.status(200).json(products);
  } catch (error) {
    console.error("Error al obtener todos los productos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}); 

router.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    console.log(`Obteniendo producto con ID: ${pid}`);
    const product = await productManager.getProductById(parseInt(pid));
    console.log("Producto obtenido:", product);
    return res.status(200).json(product);
  } catch (error) {
    console.error(`Error al obtener producto con ID ${pid}:`, error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.post("/", async (req, res) => {
  try {
    console.log("Agregando un nuevo producto...");
    const product = req.body;
    console.log("Datos del nuevo producto:", product);
    const newProduct = await productManager.addProduct(product);
    console.log("Producto agregado:", newProduct);
    return res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error al agregar un nuevo producto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.put("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    console.log(`Actualizando producto con ID: ${pid}`);
    const product = req.body;
    console.log("Nuevos datos del producto:", product);
    const updateProduct = await productManager.updateProduct(pid, product);
    console.log("Producto actualizado:", updateProduct);
    return res.status(200).json(updateProduct);
  } catch (error) {
    console.error(`Error al actualizar producto con ID ${pid}:`, error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    console.log(`Eliminando producto con ID: ${pid}`);
    await productManager.deleteProduct(pid);
    console.log("Producto eliminado");
    return res.status(201).json({ message: "Producto eliminado" });
  } catch (error) {
    console.error(`Error al eliminar producto con ID ${pid}:`, error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});


export default router;
