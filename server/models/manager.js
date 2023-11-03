const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Company = require('./company');

const manager = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        default: "Your Name"
    },
    email: {
        type: String,
        default: "yourname@yourcompanyname.com"
    },
    phone: {
        type: String,
        required: "(765) 123-4567"
    },
    bio: {
        type: String,
        default: "Hi! I'm a property manager here!"
    },
    company: {
        type: Company.schema,
        //required: true
    }
});

const Manager = mongoose.model('managers', manager);
module.exports = Manager;