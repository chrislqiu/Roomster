const mongoose = require('mongoose');
const propertyCard = require('./propertyCard');
const Schema = mongoose.Schema;

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
    userInformation: {
        name: {
            type: String,
            required: true
        },
        contactInfo: {
            email: {
                type: String,
                match: ['^[a-zA-Z]\w{0,11}@\w{3,}\.\w{3}$', 'invalid email'],
                required: true
            },
            phone: {
                type: String,
                match: ['^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$', 'invalid phone number'],
                required: false
            }
        },
        bio: {
            type: String,
            default: "Hi! I'm a property manager here!"
        }
    },
    companyInformation: {
        name: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        site: {
            type: String,
            required: true
        },
        contactInfo: {
            email: {
                type: String,
                match: ['^[a-zA-Z]\w{0,11}@\w{3,}\.\w{3}$', 'invalid email'],
                required: false
            },
            phone: {
                type: String,
                match: ['^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$', 'invalid phone number'],
                required: true
            }
        },
        myCoops: {
            type: [propertyCard.schema],
            required: true
        }
    }
});

//looks for this collection in db (it's suppose to be singular and not "PropertyCards")
const PMUser = mongoose.model('propertymanagerusers', propertyManagerUser);
module.exports = PMUser;