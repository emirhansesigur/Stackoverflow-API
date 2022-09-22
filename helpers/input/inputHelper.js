const bcrypt = require("bcryptjs")

const CustomError = require("../error/CustomError");

const validateUserInput = (email, password)=>{
    return email && password;
}

const comparePassword = (password, hashedPassword)=>{
    return bcrypt.compareSync(password, hashedPassword); // OK => true
}

module.exports = {
    validateUserInput,
    comparePassword
};