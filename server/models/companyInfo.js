const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companyInfo = new Schema({
    name: {
      type: String,
      required: false
    },
    address: {
      type: String,
      required: true
    },
    site: {
      type: String,
      required: false
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: false
    }
});

const CompanyInfo = mongoose.model('companyinfo', companyInfo);
module.exports = CompanyInfo;