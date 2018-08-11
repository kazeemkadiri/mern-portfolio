const bcrypt = require('bcrypt')
const createSymlink = require('create-symlink');
const {realpathSync, unlink } = require('fs');

hashPassword = async (password) => {

    const hashedPassword = await bcrypt.hash(password, 10);

    return hashedPassword;
}

myFileUploadHandler = (req, res) => {

    // req.app.NODE_PRODUCTION_ENV
    req.app.NODE_PRODUCTION_ENV = true;

    if (!req.files)
    return res.status(400).send('No files were uploaded.')

    // The name of the input field (i.e. "file") is used to retrieve the uploaded file
    let uploadedFile = req.files.file
    
    let fileName = uploadedFile.name.split('-').join('_')

    const fileUploadDir = `${__dirname}/../storage/app/uploads/${fileName}`

    const publicDir = !req.app.NODE_PRODUCTION_ENV ?
                        `${__dirname}/../build/images/${fileName}`:
                        `${__dirname}/../../client/public/images/${fileName}`

    // Use the mv() method to place the file somewhere on your server
    uploadedFile.mv(    
        fileUploadDir,
        function(err) {
            if (err){
                console.log(err)
                return res.status(500).send(err);
            }

            // Symlink is created to link uploaded file to public directory
            createSymlink(fileUploadDir, publicDir).then(() => {
                realpathSync(fileUploadDir); //=> '/where/file/exists'
            });
        
            res.send({'location': `/images/${fileName}`});
        });


}

getImageName = imgHtmlElement => {
    
    if(!imgHtmlElement || imgHtmlElement === undefined) 
        return ''

    return imgHtmlElement.split('src="')[1].split('"')[0].split('/').unshift()

}

/**
 *  @param images (Array of image names)
 */
deleteImages = imgNames => {

    console.log('image name', imgNames)
    
    const defaultUploadDir = '../storage/app/uploads/'

    imgNames.forEach( imgName => {

        const realImagePath = `${defaultUploadDir}${imgName}`

        unlink(realImagePath, err => console.log(err))

    });

}

module.exports.hashPassword = hashPassword

module.exports.myFileUploadHandler = myFileUploadHandler

module.exports.getImageName = getImageName

    

