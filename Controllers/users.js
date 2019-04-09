const User = require('../models/User');

module.exports = {
    getAll() {
        return User.find();
    },
    getById(userId) {
        return User.findById(userId);
    },
    add(user) {
        return User.create(user);
    },
    delete(userId) {
        return User.findByIdAndDelete(userId);
    },
    patch(userId, updatedUser) {
        return User.findByIdAndUpdate(userId, updatedUser);
    }
}