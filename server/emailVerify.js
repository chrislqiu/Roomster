const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "roomster.auth@gmail.com",
        pass: "tffz cdux eabd wrva"
    }
});

const sendVerificationEmail = (userEmail, verificationToken) => {
    const mailDetails = {
        from: 'roomster.auth@gmail.com',
        to: userEmail,
        subject: 'Verify your Roomster Account',
        html: '<p>Thank you for choosing Roomster!<br>To verify your account, please click "Verify Account" below. This link will expire in 10 minutes.</p><a href="http://localhost:8000/auth/verify/' + verificationToken + '">Verify Account</a>'
    };

    transporter.sendMail(mailDetails, function(err, data) {
        if(err) {
            console.log(err);
        } else {
            console.log('Email sent successfully');
        }
    });
};

module.exports = sendVerificationEmail;


 
