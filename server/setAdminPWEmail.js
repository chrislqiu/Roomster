const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "roomster.auth@gmail.com",
        pass: "tffz cdux eabd wrva"
    }
});

const setAdminPWEmail = (userEmail, verificationToken) => {
    const mailDetails = {
        from: 'roomster.auth@gmail.com',
        to: userEmail,
        subject: 'Set your Roomster Admin Account Password',
        html: '<p>You have been verified for a Roomster Admin Account. Please click the link below to set your password. </p><a href="http://localhost:8000/auth/admin/verify-set-pw/' + verificationToken + '">Set Password</a>'
    };

    transporter.sendMail(mailDetails, function(err, data) {
        if(err) {
            console.log(err);
        } else {
            console.log('Email sent successfully');
        }
    });
};

module.exports = setAdminPWEmail;


 
