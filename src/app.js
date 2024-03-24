// crear servidor express
import express from "express";
//Multer middleware express
import multer from "multer";
//Handlebars
import exphbs from "express-handlebars";
//connect mongo
import "./daos/mongoDb/connection/mongooseConnection.js";
//socket
import { Server } from "socket.io"
//Import router
// import routerProducts from "./routes/FS/products.router.js";
// import routerCarts from "./routes/FS/carts.router.js";
import routerViews from "./routes/views.js";
//DB router
import routerUser from "./routes/DB/usersDB.js";
import routerDB from "./routes/DB/productsDB.js";
import routerCartDB from "./routes/DB/cartsDB.js";

//designamos el puerto
const PORT = 8080;

// creando una nueva instancia de la aplicación Express
const app = express();

//Este middleware cuando una solicitud llega al servidor con un cuerpo en formato JSON. 
app.use(express.json());

//este middleware lo analiza y lo convierte en un objeto JavaScript 
app.use(express.urlencoded({ extended: true }));

//config handlebars: express busca archivos .handelbars y lo renderize
//le decimos a express que use el motor de plantilla:
app.engine("handlebars", exphbs.engine({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    }
}));
app.set("view engine", "handlebars");
app.set("views", "./src/views");
//carpeta static Public
app.use(express.static('./src/public'));

//routes

app.use("/api/client", routerUser);
app.use("/api/products", routerDB);
app.use("/api/cart", routerCartDB);
app.use("/", routerViews);
// app.use("/api/products", routerProducts);
// app.use("/api/carts", routerCarts);



//indicar al servidor que comience a escuchar las solicitudes
const httpServer = app.listen(PORT, () => {
    console.log(`escuchando al puerto ${PORT}`);
});







