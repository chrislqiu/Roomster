const express = require("express");
const Manager = require('./models/manager');
const router = express.Router();
const bodyParser = require("body-parser");
const Manager = require("./models/manager")
const Company = require("./models/company")
const CompanyInfo = require("./models/companyInfo")
router.use(bodyParser.json());

router.get('/saveMProfile', (req, res) => {
    const data = req.body;
    console.log(data)


    //const newManagerProfile = new managerProfile(data);

    const newCompanyInfo = new CompanyInfo({
        name: data.company.name,
        address: data.company.address,
        phone: data.company.phone
    })

    const newCompany = new Company({
        companyInfo: newCompanyInfo
    })

    const newManagerProfile = new Manager({
        name: data.name,
        phone: data.phone,
        email: data.email,
        bio: data.bio,
        company: newCompany
    })


    newManagerProfile.save((err) => {
        if (err) {
            console.error('ERROR SAVING: ', err);
            res.status(500).json({error: 'ERROR SAVING'});
        } else {
            console.log("DATA SAVED YAY");
            res.json({message: 'DATA SAVED'});
        }
    })
})

module.exports = router;