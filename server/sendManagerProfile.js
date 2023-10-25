const express = require("express");
const Manager = require('./models/manager');
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.json());

router.get('/saveMProfile', (req, res) => {
    const data = req.body;
    console.log(data)

    const newManager = new Manager(data);

    newManager.save((err) => {
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