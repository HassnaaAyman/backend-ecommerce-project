const mongoose = require('mongoose');
const debug = require('debug')('ecommerce:server');

const connectionURL = process.env.MONGO_URL || 'mongodb://localhost:27017/ecommerce';

debug(`connecting to MONGO on ${connectionURL}`);

mongoose.connect(connectionURL,
    {
        useCreateIndex: true,
        autoIndex: true,
        useNewUrlParser: true
    },
    (err) => {
        if (err) {
            console.error(err);
            process.exit(1);
        } else {
            debug(`connected successfully to MONGO`);
        }
    })