const uuidv4 = require('uuid/v4');
const host = require('../config/app').host;
const mailerDetails = require('../config/keys');
const nodemailer = require('nodemailer');
const userModel = require('../models/user');

const generateResetPasswordMailMessage = (resetPasswordUrl) => {

    return `
        <p> You are receiving this mail based on your request to reset your password</p>
        <p> Pls click on the following link to reset your password ${ resetPasswordUrl }</p>
    `;

}

const generateContactMailMessage = ({name, email, subject, message}) => {

    return `
        <p> Message from ${name} </p>
        <p> <strong>Email:</strong> ${email} </p>
        <p> <strong>Subject:</strong> ${ subject }</p>
        
        <br />
        
        <p>
            ${ message } 
        </p>
    `;

}

const generateMailOptions = (mailSubject, messageBody) => ({
    from: mailerDetails.email, // sender address
    to: mailerDetails.email, // list of receivers
    subject: mailSubject, // Subject line
    html: messageBody// plain text body
})

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: mailerDetails.email,
           pass: mailerDetails.password
       }
   });


module.exports.sendContactMail = async (mailFormParams) => {

    const mailOptions = generateMailOptions(
                            "Message from my portfolio heroku site", 
                            generateContactMailMessage(mailFormParams)
                        )
    const response = await transporter.sendMail(mailOptions);

    return response

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


        const mailOptions = generateMailOptions(
                                "Mail reset link", 
                                generateResetPasswordMailMessage(resetPasswordUrl)
                            )

        response = await transporter.sendMail(mailOptions);

        return response
    }

}