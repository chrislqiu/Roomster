const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Company = require('./company');

const manager = new Schema({
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
    },
    name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    bio: {
        type: String,
        default: "Hi! I'm a property manager here!"
    },
    company: { //only attach company if user isVerfied is true
        type: Company.schema,
        required: true
    }
});

const Manager = mongoose.model('managers', manager);
module.exports = Manager;