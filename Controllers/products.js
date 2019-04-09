const Products = require('../models/Product');

module.exports = {
    getAll() {
        return Products.find();
    },
    getById(id) {
        return Products.findById(id);
        //return Products.findOne({id: id});
    },
    getByCategoryId(categoryId) {
        return Products.find({ "category": categoryId })
    },

    getCategory(productId) {
        return Products.findById(productId);
    },
    add(product) {
        return Products.create(product);
    },
    delete(productId) {
        return Products.findByIdAndDelete(productId);
    },
    patch(productId, productUpdate) {
        return Products.findByIdAndUpdate(productId, productUpdate);
    },
}
