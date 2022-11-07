const asyncErrorWrapper = require("express-async-handler");
const Question = require("../models/Question");
const Answer = require("../models/answer");
const {checkQuestionAndAnswerExist} = require("../middlewares/database/databaseErrorHelpers");
const CustomError = require("../helpers/error/CustomError");

const addNewAnswerToQuestion = asyncErrorWrapper ( async function (req, res, next){

    const {question_id} = req.params;
    const user_id = req.user.id;

    const answer = await Answer.create({
        content: req.body.content,
        user: user_id,
        question: question_id
    })
    await answer.save();

    res
    .status(200)
    .json({
        success: true,
        answer: answer
    })
    
});

const getAllAnswersByQuestion = asyncErrorWrapper ( async function (req, res, next){
    const answers_id = [];
    //const answers = [];
    const {question_id} = req.params;
    
    
    const question = await Question.findById(question_id).populate("answer");
    
    // ... kullanmadan uzun yol/
//     for(let i=0;i<question.answer.length;i++){
//         //answers_id[i] = question.answer[i];
//         answers_id.push(question.answer[i]);
//     }
// console.log(answers_id);

//     for(let i=0;i<question.answer.length;i++){
//         answers[i] = await Answer.findById(answers_id[i]);
//     }
    
    const answers = question.answer;

    res.status(200)
    .json({
        success: true,
        answers: answers
    })

});

const getSingleAnswer = asyncErrorWrapper ( async function (req, res, next){
    //const {question_id} = req.params;
    //const question = await Question.findById(question_id);    
    const {answer_id} = req.params;

    const singleAnswer = await Answer.findById(answer_id)
    .populate({
        path: "user",
        select: "name"
    })
    .populate({
        path: "question",
        select: "title content"
    });

    res.status(200)
    .json({
        success: true,
        answers: singleAnswer
    })

});


const editAnswer = asyncErrorWrapper ( async function (req, res, next){
    const {answer_id} = req.params;

    const new_content = req.body.new_content;

    if(new_content.length <20){
        return next(new CustomError("you need to provide a content at list 10 characters", 400));
    }
    
    const answer = await Answer.findById(answer_id);
    answer.content = new_content;
    answer.createdAt = Date.now();

    const newAnswer = await answer.save();

    return res.status(200)
    .json({
        success: true,
        newAnswer: answer
    })


});


const deleteAnswer = asyncErrorWrapper ( async function (req, res, next){
    const {answer_id} = req.params;

    const answer = await Answer.findByIdAndDelete(answer_id);
    const question = await Question.findById(question_id);
    
    //const bulundu_mu = question.answer.findById(answer_id);
    const index = question.answer.indexOf(answer_id);
    
    question.answer.splice(index, 1);
    question.answerCount = question.answer.length;

    await question.save();
    res.status(200)
    .json({
        success:true,
        info: "answer deletion is successful"
    });

});


const likeAnswer = asyncErrorWrapper ( async function (req, res, next){
    const {answer_id} = req.params;
    const answer = await Answer.findById(answer_id)

    if(answer.likes.includes(req.user.id)){
        return next(new CustomError("you have already liked the answer", 400))
    }
    // question.likes is an array.
    answer.likes.push(req.user.id);

    await answer.save();

    return res
    .status(200)
    .json({
        success: true,
        info: "the answer is liked"
    })

});

const undoLikeAnswer = asyncErrorWrapper ( async function (req, res, next){
    const {answer_id} = req.params;
    const answer = await Answer.findById(answer_id)

    if(!answer.likes.includes(req.user.id)){
        return next(new CustomError("This answer was not liked before", 400));
    }

    // question.likes is an array.
    answer.likes.remove(req.user.id);
    
    await answer.save();


    return res
    .status(200)
    .json({
        success: true,
        likes: answer.likes,
        info: "Answer unliked"
    })
});

module.exports = {
    addNewAnswerToQuestion,
    getAllAnswersByQuestion,
    getSingleAnswer,
    editAnswer,
    deleteAnswer,
    likeAnswer,
    undoLikeAnswer
};
