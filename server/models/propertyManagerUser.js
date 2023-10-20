const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Company = require('./company');

const propertyManagerUser = new Schema({
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
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
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

const PMUser = mongoose.model('propertymanagerusers', propertyManagerUser);
module.exports = PMUser;