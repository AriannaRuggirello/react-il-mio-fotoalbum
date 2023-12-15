const bcrypt = require("bcrypt");


async function hashPassword(password) {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
}

// verificare se una password in chiaro corrisponde a una password hashata.
async function comparePassword(password, hashedPassword) {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
    }


    module.exports ={
        hashPassword,
        comparePassword
    }