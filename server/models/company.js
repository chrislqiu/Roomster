const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Property = require('./propertyCard');

const company = new Schema({
    companyInfo: {
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
            default: false
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        }
    },
    myCoops: { //TODO: fix obj ref
        type: Schema.Types.ObjectId,
        ref: 'Property.propertyInfo',
        required: true
    }
});

const Company = mongoose.model('companies', company);
module.exports = Company;