const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const propertyInfo = new Schema({
    image: {
        type: [String],
        required: false
    },
    propertyName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    latitude: {
        type: Number,
        required: false
    },
    longitude: {
        type: Number,
        required: false
    },
    beds: {
        type: Number,
        required: true
    },
    baths: Schema.Types.Mixed,
    cost: Schema.Types.Mixed,
    sqft: Schema.Types.Mixed,
    distance: Schema.Types.Mixed, //distance from memorial mall in miles
    amenities: {
        type: [String],
        required: false
    },
    utilities: {
        type: [String],
        required: false
    },
    featured: {
        type: Boolean,
        default: false
    },
    saves: {
        type: Number,
        default: 0
    },
    featureRequest: {
        type: Boolean,
        default: false
    }
});

const PropertyInfo = mongoose.model('propertyinfo', propertyInfo);
module.exports = PropertyInfo;