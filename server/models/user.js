const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

//looks for this collection in db (it's suppose to be singular and not "PropertyCards")
const User = mongoose.model('users', user);
module.exports = User;