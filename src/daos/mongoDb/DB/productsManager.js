import { ProductsModel } from "../schema/products.model.js"

export default class ProductsManager {
    async getAll() {
        try {
            return await ProductsModel.find();
        } catch (error) {
            console.error("Error getting Products", error);
            throw error;
        }
    };
    async createProduct(product) {
        try {
            const newProduct = await ProductsModel.create(product)
            console.log("Product added successfully:", newProduct);

            return newProduct;
        } catch (error) {
            console.error("Error adding product:", error);
            throw error;
        }
    };

    async getById(id) {
        try {
            return await ProductsModel.findById(id);
        } catch (error) {
            console.error("error searching ID", error);
            throw error;
        }
    }

    async updateProduct(id, updatedData) {
        try {
            // Utiliza el método findByIdAndUpdate() de Mongoose para actualizar el producto
            const updatedProduct = await ProductsModel.findByIdAndUpdate(id, updatedData, { new: true });
            if (!updatedProduct) {
                console.error("Product not found");
                return null; // Si el producto no se encuentra, devuelve null
            }
            console.log("Product updated successfully:", updatedProduct);
            return updatedProduct;
        } catch (error) {
            console.error("Error updating product:", error);
            throw error;
        }
    }

    async productDelete(id) {
        try {
            const product = await ProductsModel.findByIdAndDelete(id);
            return product;
        } catch (error) {
            console.log(error);
        }
    };
}