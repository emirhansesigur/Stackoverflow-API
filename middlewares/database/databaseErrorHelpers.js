const User = require("../../models/user");

const CustomError = require("../../helpers/error/CustomError");


const asyncErrorWrapper = require("express-async-handler");

const checkUserExist = asyncErrorWrapper ( async function (req, res, next){
    const {id} = req.params;

    const user = await User.findById(id);

    if(!user){
        return next(new CustomError("User is not exist with that id.", 400));
    }
    next();
});
//return next(new CustomError("User Not Found With That Email",400));
module.exports = {
    checkUserExist
};