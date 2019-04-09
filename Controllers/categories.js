const categories = require('../models/Category');
const products = require('./products');

module.exports = {

    getAll() {
        return categories.find();
    },

    getById(id) {
        return categories.findById(id);
    },

    async getByProductId(productId) {
        const product = await products.getById(productId);
        return categories.findById(product.category);
    },
    add(category) {
        return categories.create(category);
    },
    delete(CategoryId) {
        return categories.findByIdAndDelete(CategoryId);
    },

    patch(CategoryId, updateCategory) {
        return categories.findByIdAndUpdate(CategoryId, updateCategory);
    }
}