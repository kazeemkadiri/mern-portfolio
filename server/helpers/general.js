const bcrypt = require('bcrypt')


hashPassword = async (password) => {

    const hashedPassword = await bcrypt.hash(password, 10);

    return hashedPassword;
}

myFileUploadHandler = (req, res) => {

    if (!req.files)
    return res.status(400).send('No files were uploaded.')

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let uploadedFile = req.files.file
    
    console.log(__dirname)

    let fileName = uploadedFile.name

    // Use the mv() method to place the file somewhere on your server
    uploadedFile.mv(`${__dirname}/../../client/public/images/${fileName}`, 
                    function(err) {
                        if (err)
                        return res.status(500).send(err);
                    
                        res.send({'location': `/images/${fileName}`});
                    });


}

module.exports.hashPassword = hashPassword

module.exports.myFileUploadHandler = myFileUploadHandler

    

