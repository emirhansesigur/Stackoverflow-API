const User = require("../../models/user");
const CustomError = require("../error/customErrorHandler");
const asyncErrorWrapper = require("express-async-handler");

const checkUserExist = asyncErrorWrapper ( async function (req, res, next){
    const {id} = req.params;

    const user = await User.findById(id);

    if(!user){
        next(new CustomError("User is not found by that id", 400))
    }
    next();
});

module.exports = {
    checkUserExist
};