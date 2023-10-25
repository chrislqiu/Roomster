const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companyInfo = new Schema({
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
      required: false //TODO: make true when prompted on front end
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    }
});

const CompanyInfo = mongoose.model('companyinfo', companyInfo);
module.exports = CompanyInfo;