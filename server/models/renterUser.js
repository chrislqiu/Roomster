const mongoose = require('mongoose');
const propertyCard = require('./propertyCard');
const Schema = mongoose.Schema;

const renterUser = new Schema({
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
        age: {
            type: Number,
            required: true
        },
        gender: {
            type: String,
            enum: ['Male', 'Female', 'Intersex', 'Non-Binary', 'Agender', 'Genderfluid'],
            required: false
        },
        contactInfo: {
            email: {
                type: String,
                match: ['^[a-zA-Z]\w{0,11}@purdue\.edu$', 'invalid email'],
                required: true
            },
            phone: {
                type: String,
                match: ['^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$', 'invalid phone number'],
                required: false
            }
        }
    },
    findingCoopmates: {
        type: Boolean,
        default: false
    },
    livingPreferences: {
        pets: {
            type: Boolean,
            required: true
        },
        smoke: {
            type: Boolean,
            required: true
        },
        studious: {
            type: Number,
            min: 0,
            max: 5
        },
        cleanliness: {
            type: Number,
            min: 0,
            max: 5
        },
        weeklyVisitors: {
            type: Number,
            min: 0,
            max: 5
        },
        sleepSchedule: {
            asleep: {
                type: Number,
                min: 0,
                max: 23
            },
            awake: {
                type: Number,
                min: 0,
                max: 23
            }
        }
    },
    favCoops: {
        type: [propertyCard.schema],
        required: false
    }
});

//looks for this collection in db (it's suppose to be singular and not "PropertyCards")
const RUser = mongoose.model('renterusers', renterUser);
module.exports = RUser;