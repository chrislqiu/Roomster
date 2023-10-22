const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "roomster.auth@gmail.com",
        pass: "tffz cdux eabd wrva"
    }
});

const changePasswordEmail = (userEmail, verificationToken) => {
    const mailDetails = {
        from: 'roomster.auth@gmail.com',
        to: userEmail,
        subject: 'Reset your Roomster Account Password',
        html: '<p>Please click the link below to reset your password. If you did not request to change your password, do not click the link. This link will expire in 10 minutes.</p><a href="http://localhost:8000/auth/verify-pw-reset/' + verificationToken + '">Reset Password</a>'
    };

    transporter.sendMail(mailDetails, function(err, data) {
        if(err) {
            console.log(err);
        } else {
            console.log('Email sent successfully');
        }
    });
};

module.exports = changePasswordEmail;


 
