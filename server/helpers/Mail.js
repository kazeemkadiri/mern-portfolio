const uuidv4 = require('uuid/v4');
const host = require('../config/app').host;
const mailerDetails = require('../config/keys');
const nodemailer = require('nodemailer');
const userModel = require('../models/user');

generateMailMessage = (resetPasswordUrl) => {

    return `
        <p> You are receiving this mail based on your request to reset your password</p>
        <p> Pls click on the following link to reset your password ${ resetPasswordUrl }</p>
    `;

}

module.exports.sendResetMailPassword = async ( email ) => {

    const token = await uuidv4();

    let response = { emailExists: false, mailStatus: false };

    const result = await userModel.findOneAndUpdate(
                                { 'email': email }, 
                                {$set: { 'token': token }},
                                {
                                    upsert: true, 
                                    returnNewDocument: true
                                }
                              )

    if(result) {

        const resetPasswordUrl = `${host}/password-reset/${token}`;

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                   user: mailerDetails.email,
                   pass: mailerDetails.password
               }
           });

        const mailOptions = {
            from: mailerDetails.email, // sender address
            to: mailerDetails.email, // list of receivers
            subject: 'Mail reset link', // Subject line
            html: generateMailMessage(resetPasswordUrl)// plain text body
        };

        response = await transporter.sendMail(mailOptions);

        return response
    }

    

}