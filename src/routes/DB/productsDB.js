import { Router } from "express";
import * as controller from "../../controllers/products.controllers.js"

const routerDB = Router();

// Buscar por limit
// http://localhost:8080/api/products?limit=8
// ordena desc y asc
// http://localhost:8080/api/products?page=1&limit=5&sortOrder=asc
// http://localhost:8080/api/products?page=1&limit=5&sortOrder=desc
// busca por limit, year y ordena desc y asc
// http://localhost:8080/api/products?limit=15&year=2024&sortOrder=desc  
// http://localhost:8080/api/products?limit=15&year=2025&sortOrder=asc
routerDB.get("/", controller.getAll);
routerDB.get("/:id", controller.getById)
routerDB.get("/search/:year", controller.getAggregation);
routerDB.post("/add", controller.createProduct);
routerDB.put("/update/:id", controller.productUpdate);
routerDB.delete("/:id", controller.deleteProduct);


export default routerDB;