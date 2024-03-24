// crear servidor express
import express from "express";
//Handlebars
import exphbs from "express-handlebars";
//Cookie-parser
import cookieParser from "cookie-parser";
//connect mongo
import "./daos/mongoDb/connection/mongooseConnection.js";
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

//cookie
const miClaveSecreta = "RapidoFurioso"
//Middleware e analiza las cookies adjuntas en las solicitudes HTTP y las convierte en un objeto JavaScript. 
//Esto facilita el acceso a las cookies desde el código del servidor.
app.use(cookieParser(miClaveSecreta));

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


//setear una cookie
//maxAge seteamos el timepo de vida de la cookie ms
app.get('/setcookie', (req,res)=>{
    res.cookie("coderCookie", "mi primera chamba", {maxAge: 10000}).send("cookie seteada");
});
//leer una cookie
app.get('/leercookie', (req,res)=>{
    res.send(req.cookies)
});
//borrar cookies
app.get("/borrarcookie", (req,res)=>{
    res.clearCookie("coderCookie").send("Eliminada la cookie")
});

//Enviar una cookie firmada
app.get("/cookiefirmada", (req,res)=>{
    res.cookie("cookieFirmada","estos es una Shi##", {signed: true})
    .send("firmada");
});
//recuperamos una cookiefirmada
app.get("/recuperamoscookiefirmada", (req,res)=>{
    //req.signedCookies
    const valorCookie = req.signedCookies.cookieFirmada;
    if(valorCookie){
        res.send("cookie recuperada: " + valorCookie);
    } else {
        res.send("cookie invalida")
    }
})

//indicar al servidor que comience a escuchar las solicitudes
const httpServer = app.listen(PORT, () => {
    console.log(`escuchando al puerto ${PORT}`);
});







