import express from "express";
import router from "./routes/index.js"

const app = express();

/// Middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);




app.listen(8080, () => {
  console.log("Servidor listo en puerto 8080");
});
