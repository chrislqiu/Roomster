const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const admin = new Schema({
    username: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    },
    isVerified: {
        type: Boolean,
        default: false
    }   
});

const Admin = mongoose.model('admins', admin);
module.exports = Admin;