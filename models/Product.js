const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new mongoose.Schema({
    ProductImg: String,
    name: String,
    priceBefore: { type: Number },
    onSale: String,
    priceAfter: Number,
    category: String,
    description: String,
    PaymentTypes: String

});
module.exports = mongoose.model("Product", ProductSchema);