const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const { promisify } = require('util');
const createError = require('http-errors');

const saltRounds = 10;
const secretKey = 'MY_SECRET_KEY';



const schema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, validate: validator.isEmail }
},
    {
        autoIndex: true,
        toJSON: {
            transform: true,
            hide: 'password'
        }
    });


//user regestration

schema.pre('save', async function () {
    if (this.isNew || this.modifiedPaths().includes('password')) {
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
});


schema.options.toJSON.transform = function (doc, ret, options) {
    if (options.hide) {
        options.hide.split('').forEach((prop) => {
            delete ret[prop];
        });
    }
    return ret;
}


// user login
const sign = promisify(jwt.sign);
const verify = promisify(jwt.verify);

schema.method('verifyPassword', function (password) {
    return bcrypt.compare(password, this.password);
});

schema.method('generateToken', async function () {
    const user = this;
    const token = await sign({ _id: user._id }, secretKey);
    return token;
});

//home page
schema.static('getUserByToken', async (token) => {
    const decoded = await verify(token, secretKey).catch(console.error);
    return decoded._id;
});


module.exports = mongoose.model("User", schema);