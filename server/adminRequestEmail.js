const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "roomster.auth@gmail.com",
        pass: "tffz cdux eabd wrva"
    }
});

const adminRequestEmail = (userEmail, verificationToken) => {
    const mailDetails = {
        from: 'roomster.auth@gmail.com',
        to: 'roomster.auth@gmail.com',
        subject: 'Admin Account Request',
        html: '<p>' + userEmail + ' has requested an admin account. Choose accept to accept the request and deny to deny the request.</p><a href="http://localhost:8000">Accept</a>&nbsp;&nbsp;<a href="http://localhost:8000">Deny</a>'
    };

    transporter.sendMail(mailDetails, function(err, data) {
        if(err) {
            console.log(err);
        } else {
            console.log('Email sent successfully');
        }
    });
};

module.exports = adminRequestEmail;


 
