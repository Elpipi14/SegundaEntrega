import { Router } from "express";
import { ProductManager } from "../daos/fileSystem/productManager.js";
import ChatManager from "../daos/mongoDb/DB/chat.manager.js";
import ProductsManager from "../daos/mongoDb/DB/productsManager.js";

const routerViews = Router();
const productManager = new ProductManager();
const productsDB = new ProductsManager();
const chatManager = new ChatManager();

routerViews.get('/', async (req, res) => {
    try {
        const productList = await productsDB.getAll()
        const leanProducts = productList.payload.products.map(product => product.toObject({ getters: true }))
        res.render('index', { products: leanProducts });
    } catch (error) {
        console.error('Error al obtener productos:', error.message);
        res.status(500).send('Error interno del servidor');
    }
});

routerViews.get('/products', async (req, res) => {
    try {
        const page = req.query.page || 1;
        const productList = await productsDB.getAll(page);
        // Convierte los productos en objetos lean para evitar problemas de referencia y mejora el rendimiento
        const leanProducts = productList.payload.products.map(product => product.toObject({ getters: true }));
        // Obtiene la información de paginación de la lista de productos
        const pageInfo = productList.payload.info;
        // Renderiza la plantilla 'products' pasando la lista de productos, información de paginación y demás datos necesarios
        res.render('products', { products: leanProducts, pageInfo });
    } catch (error) {
        console.error('Error al obtener productos:', error.message);
        res.status(500).send('Error interno del servidor');
    }
});

routerViews.get('/view/:id', async (req, res) => {
    try {
        // busca por params el id del producto y muestra en el render de view
        const productId = req.params.id;
        const product = await productsDB.getById(productId);
        res.render('partials/view', { product: product });
    } catch (error) {
        console.error('Error al obtener el perfil del usuario:', error);
        res.status(500).send('Error interno del servidor');
    }
});

routerViews.get('/contact', async (req, res) => {
    try {
        // Obtener todos los chats desde el gestor de chats
        const chats = await chatManager.getAllChats();
        // Renderizar la plantilla Handlebars con los chats obtenidos
        res.render('contact', { messages: chats });
    } catch (error) {
        console.error('Error getting chats:', error);
        res.status(500).send('Internal Server Error');
    }
});

routerViews.post('/contact/send', async (req, res) => {
    try {
        const { email, message } = req.body;
        await chatManager.createChat(email, message);
        res.redirect('/contact');
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).send('Internal Server Error');
    };
});

//Login
routerViews.get('/login', async (req, res) => {
    res.render('partials/login');
});

routerViews.get('/register', async (req, res) => {
    res.render('partials/register');
});

routerViews.get('/profile', async (req, res) => {
    try {
        res.render('partials/profile');
    } catch (error) {
        console.error('Error al obtener el perfil del usuario:', error);
        res.status(500).send('Error interno del servidor');
    };
});




export default routerViews;