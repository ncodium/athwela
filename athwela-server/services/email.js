const nodemailer = require('nodemailer');
const gmail = require('../config/gmail');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: gmail.username,
        pass: gmail.password
    }
});

module.exports = transporter;