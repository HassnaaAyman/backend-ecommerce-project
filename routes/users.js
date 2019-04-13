const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const User = require('../models/User');
const UserC = require('../Controllers/users');
const authenticationMiddleware = require('../middlewares/authentecation');


// base route /users

//registration
router.post('/', async (req, res, next) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.send(user);
    } catch (err) {
        next(createError(400, err));
    }
});


//login 
router.post('/login', async (req, res, next) => {
    if (!req.body.username || !req.body.password) return next(createError(400, 'missing arguments'))
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(401));
    const isMatch = await user.verifyPassword(req.body.password).catch(console.error);
    if (!isMatch) return next(createError(401));
    const token = await user.generateToken();
    res.send({
        token,
        user
    });
});

/* get all users */
router.get('/', async function (req, res, next) {
    let user = await UserC.getAll().catch(console.error);
    res.send(user);
});

/* get user by id */
router.get('/:userId', async function (req, res, next) {
    let user = await UserC.getById(req.params.userId).catch(console.error);
    res.send(user);
});

/* Add new user */
router.post('/', async function (req, res, next) {
    let adduser = await UserC.add(req.body).catch(console.error);
    res.send(adduser);
});

/* Delete user */
router.delete('/:userId', async function (req, res, next) {
    let deleteduser = await UserC.delete(req.params.userId, true).catch(console.error);
    res.send(deleteduser);
});

/* Update user*/
router.patch('/:userId', async function (req, res, next) {
    let updateduser = await UserC.patch(req.params.userId, req.body).catch(console.error);
    res.send(updateduser);
});

// middleware
router.use(authenticationMiddleware);

//get home page
router.get('/product-list', (req, res) => {
    res.send("product-list");
});


module.exports = router;