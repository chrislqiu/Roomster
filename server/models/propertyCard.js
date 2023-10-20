const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Company = require('./company');

const propertyCard = new Schema({
    propertyInfo: {
        image: {
            type: String,
            required: true
        },
        propertyName: {
            type: String,
            required: true
        },
        addr: {
            type: String,
            required: true
        },
        numBed: {
            type: Number,
            required: true
        },
        numBath: Schema.Types.Mixed,
        cost: Schema.Types.Mixed,
        featured: {
            type: Boolean,
            default: false
        },
        saves: {
            type: Number,
            default: 0
        },
        amenities: {
            type: [String],
            required: true
        },
        sqft: Schema.Types.Mixed,
        distance: Schema.Types.Mixed
    },
    companyInfo: { //TODO: fix obj ref
        type: Schema.Types.ObjectId,
        ref: 'Company.companyInfo',
        required: true
    }
});

//looks for this collection in db (it's suppose to be singular and not "PropertyCards")
const Card = mongoose.model('propertycards', propertyCard);
module.exports = Card;