const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const propertyCard = new Schema({
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
    numBath: mongoose.Schema.Types.Mixed,
    cost: mongoose.Schema.Types.Mixed,
    featured: {
        type: Boolean,
        default: false
    }
});

//looks for this collection in db (it's suppose to be singular and not "PropertyCards")
const Card = mongoose.model('propertycards', propertyCard);
module.exports = Card;