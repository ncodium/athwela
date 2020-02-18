const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'athwelafunds@gmail.com',
        pass: 'athwela123'
    }
});

var mailOptions = {
    from: 'youremail@gmail.com',
    to: 'useremail@gmail.com',
    subject: 'subject',
    text: 'Hello there!',
    html: 'Hello there!'
};

transporter.sendMail(mailOptions, function(error, info) {
    if(error) {
        console.log(error);
    } else {
        console.log('Email service: ' + info.response);
    }
});

module.exports = transporter;