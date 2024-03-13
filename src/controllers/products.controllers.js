import ProductsManager from "../daos/mongoDb/DB/productsManager.js";
const productDao = new ProductsManager();

export const getAll = async (req, res) => {
    try {
        const product = await productDao.getAll();
        res.json({ message: "List Products", product });
    } catch (error) {
        res.status(500).json({ message: "error server" });
    }
};

export const getById = async (req, res) => {
    try {
        const { id } = req.params
        const product = await productDao.getById(id);
        res.json({ message: "found Product:", product });
    } catch (error) {
        res.status(500).json({ message: "error server" });
    }
};

export const createProduct = async (req, res) => {
    try {
        const newProd = await productDao.createProduct(req.body);
        if (newProd) {
            res.status(200).json({ message: "Product created", newProd })
        } else {
            res.status(404).json({ msg: "Error create product!" })
        };
    } catch (error) {
        res.status(500).json({ message: "error server", error });
    };
};


export const productUpdate = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProductData = req.body; 
        
        const updatedProduct = await productDao.updateProduct(id, updatedProductData);

        if (updatedProduct) {
            res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const prodDel = await productDao.productDelete(id)
        if (prodDel) res.status(200).json({ msg: `Product id: ${id} deleted` });
        else res.status(404).json({ msg: "Error delete product!" });
    } catch (error) {
        next(error.message);
    }
};



