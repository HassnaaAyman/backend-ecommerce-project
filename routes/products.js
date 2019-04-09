var express = require('express');
var router = express.Router();
const ProductsC = require('../Controllers/products');
const CategoriesC = require('../Controllers/categories');
const createError = require('http-errors');

/* GET all products page. */
router.get('/', async function (req, res, next) {
    let product = await ProductsC.getAll().catch(console.error);
    res.send(product);
});

/* GET  products by id  */
router.get('/:productId', async function (req, res, next) {
    let product = await ProductsC.getById(req.params.productId).catch(console.error);
    if (!product) return next(createError(404));
    res.send(product);
});

/* GETCategoriesByProductId */
router.get('/:productId/category', async function (req, res, next) {
    let category = await CategoriesC.getByProductId(req.params.productId).catch(console.error);
    if (!category) return next(createError(404));
    res.send(category);
});

/* ADD new product */
router.post('/', async function (req, res, next) {
    let addProduct = await ProductsC.add(req.body).catch(console.error);
    res.send(addProduct);
});

/* DELETE product */
router.delete('/:productId', async function (req, res, next) {
    let deletedProduct = await ProductsC.delete(req.params.productId, true).catch(console.error);
    res.send(deletedProduct);
});

/* UPDATE product */
router.patch('/:productId', async function (req, res, next) {
    let updatedProduct = await ProductsC.patch(req.params.productId, req.body).catch(console.error);
    res.send(updatedProduct);
});
module.exports = router;
