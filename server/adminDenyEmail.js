const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "roomster.auth@gmail.com",
        pass: "tffz cdux eabd wrva"
    }
});

const adminDenyEmail = (userEmail) => {
    const mailDetails = {
        from: 'roomster.auth@gmail.com',
        to: userEmail,
        subject: 'Roomster Admin Account Request',
        html: '<p>Your request for an admin account has been denied. You can contact our team at roomster.auth@gmail.com with any questions.</p>'
    };

    transporter.sendMail(mailDetails, function(err, data) {
        if(err) {
            console.log(err);
        } else {
            console.log('Email sent successfully');
        }
    });
};

module.exports = adminDenyEmail;


 
