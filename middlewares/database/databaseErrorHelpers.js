const User = require("../../models/user");
const Question = require("../../models/question");
const Answer = require("../../models/answer");

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
    //const {id} = req.params; OLD ONE
    const question_id = req.params.id || req.params.question_id;
    
    const question = await Question.findById(question_id);

    if(!question){
        return next(new CustomError("Question is not exist with that id.", 400));
    }
    next();
});

const checkQuestionAndAnswerExist = asyncErrorWrapper ( async function (req, res, next){

    const question_id = req.params.id || req.params.question_id;
    const answer_id = req.params.answer_id;
    
    const answer = await Answer.findOne({
        _id: answer_id,
        question: question_id
    });


    if(!answer){
        return next(new CustomError("There is no answer associated with that question.", 400));
    }

    next();
});

//return next(new CustomError("User Not Found With That Email",400));
module.exports = {
    checkUserExist,
    checkQuestionExist,
    checkQuestionAndAnswerExist
};