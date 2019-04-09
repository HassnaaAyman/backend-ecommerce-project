const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new mongoose.Schema({
    image: String,
    name: { type: String, required: true },
    price: { type: Number, required: true },
    isOnSale: Boolean,
    dicsount: Number,
    category: String
});
module.exports = mongoose.model("Product", ProductSchema);