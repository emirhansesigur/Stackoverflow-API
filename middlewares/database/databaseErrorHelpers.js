const User = require("../../models/user");
const Question = require("../../models/question");

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


const checkQuestionExist = asyncErrorWrapper ( async function (req, res, next){
    const {id} = req.params;

    const question = await Question.findById(id);

    if(!question){
        return next(new CustomError("Question is not exist with that id.", 400));
    }
    next();
});

//return next(new CustomError("User Not Found With That Email",400));
module.exports = {
    checkUserExist,
    checkQuestionExist
};