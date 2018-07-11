const bcrypt = require('bcrypt')

module.exports = {

    hashedPassword: async (password) => {

        await bcrypt.hash(password, 10).then((hashedPassword) => {

            return hashedPassword;

        });

    }

}