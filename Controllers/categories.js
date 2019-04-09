const categories = require('../models/Category');

module.exports = {

    getAll() {
        return categories.find();
    },

    getById(id) {
        return categories.findById(id);
    },

    getByProductId(productId) {
        return Products.find({ "product": productId })
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