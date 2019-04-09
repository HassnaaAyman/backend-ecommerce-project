const createError = require('http-errors');
const User = require('../models/User');

module.exports = async (req, res, next) => {
    const { authorization: token } = req.headers;
    if (!token) return next(createError(401));
    const id = await User.getUserByToken(token).catch(console.error);
    if (!id) return next(createError(401));
    const user = await User.findById(id).catch(console.error);
    if (!user) return next(createError(401));
    next();
};