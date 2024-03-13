import { Router } from "express";
import { ProductManager } from "../daos/fileSystem/productManager.js";
import ChatManager from "../daos/mongoDb/DB/chat.manager.js";

const routerViews = Router();
const productsManager = new ProductManager();
const chatManager = new ChatManager()

routerViews.get('/', async (req, res) => {
    try {
        const products = await productsManager.getProducts();
        const productsView = products.filter((product) => product.status == true)
        // console.log(products);
        res.render('index', { productsView });
    } catch (error) {
        console.error('Error al obtener productos:', error.message);
        res.status(500).send('Error interno del servidor');
    }
});

routerViews.get('/products', async (req, res) => {
    try {
        res.render('productsRealTime');
    } catch (error) {
        console.error('Error al obtener productos:', error.message);
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
    }
});


export default routerViews;