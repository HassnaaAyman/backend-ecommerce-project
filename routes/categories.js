var express = require('express');
var router = express.Router();
const CategoriesC = require('../Controllers/categories');
const ProductsC = require('../Controllers/products');




/* GetAll categories */
router.get("/", async function (req, res, next) {
    let categories = await CategoriesC.getAll().catch(console.error);
    res.send(categories);
});

/* GetById categories */
router.get("/:categoriesId", async function (req, res, next) {
    let categories = await CategoriesC.getById(req.params.categoriesId).catch(console.error);
    res.send(categories);
});

/* GetProductsByCategoryId */
router.get("/:categoryId/products", async function (req, res, next) {
    let product = await ProductsC.getByCategoryId(req.params.categoryId).catch(console.error);
    res.send(product);
});

/* Add new category */
router.post('/', async function (req, res, next) {
    let addcategory = await CategoriesC.add(req.body).catch(console.error);
    res.send(addcategory);
});

/* Delete  category */
router.delete("/:categorieId", async function (req, res, next) {
    let categories = await CategoriesC.delete(req.params.categorieId, true).catch(console.error);
    res.send(categories);
});

/* Update  category */
router.patch("/:categorieId", async function (req, res, next) {
    let categories = await CategoriesC.patch(req.params.categorieId, req.body).catch(console.error);
    res.send(categories);
});


module.exports = router;