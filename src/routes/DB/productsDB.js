import { Router } from "express";
import * as controller from "../../controllers/products.controllers.js"

const routerDB = Router();

routerDB.get("/", controller.getAll);
routerDB.get("/:id", controller.getById)
routerDB.post("/add", controller.createProduct);
routerDB.put("/update/:id", controller.productUpdate);
routerDB.delete("/:id", controller.deleteProduct);


export default routerDB;