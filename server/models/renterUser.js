const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Property = require('./propertyCard');

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
    findingCoopmates: {
        type: Boolean,
        default: false
    },
    userInfo: {
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
        pfp: {
            type: String,
            default: "og pfp"
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
            guestFreq: {
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
            type: [Property.schema],
            default: {}
        }
    },
    coopmates: { //TODO: fix obj ref
        type: Schema.Types.ObjectId,
        ref: 'renterUser.userInfo',
        default: {}
    }
});

const RUser = mongoose.model('renterusers', renterUser);
module.exports = RUser;