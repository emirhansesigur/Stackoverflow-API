const Question = require("../models/question");
const asyncErrorWrapper = require("express-async-handler");
const CustomError = require("../helpers/error/CustomError");


const askNewQuestion = asyncErrorWrapper ( async function (req, res, next){

    const information = req.body;
    const question = await Question.create({
        ...information,
        user: req.user.id
    })
    
    res
    .status(200)
    .json({
        success:true,
        data: question
    })

});

const getSingleQuestion = asyncErrorWrapper ( async function (req, res, next){
    // alinan id ye göre
    const {id} = req.params;

    const question = await Question.findById(id);

    res
    .status(200)
    .json({
        success: true,
        question: question
    })

});

const editQuestion = asyncErrorWrapper ( async function (req, res, next){
    const {id} = req.params; // question Id
    const {title, content} = req.body;
    
    //const question = await Quest WRONG
    let question = await Question.findById(id);

    question.title = title;
    question.content = content;

    question = await question.save();

    return res
    .status(200)
    .json({
        success: true,
        newQuestion: question
    })

});

const deleteQuestion = asyncErrorWrapper ( async function (req, res, next){
    const {id} = req.params; // question Id

    await Question.findByIdAndRemove(id);

    return
    res
    .status(200)
    .json({
        success: true,
        newQuestion: "Question deletion is successful"
    })

});

const likeQuestion =  asyncErrorWrapper ( async function (req, res, next){
    const {id} = req.params; // question Id
    const question = await Question.findById(id);
    //  gets userId
    if(question.likes.includes(req.user.id)){
        return next(new CustomError("you have already liked the question", 400))
    }
    // question.likes is an array.
    question.likes.push(req.user.id);

    await question.save();
    
    return res
    .status(200)
    .json({
        success: true,
        info: "the quesiton is liked"
    })

});

const undoLikeQuestion =  asyncErrorWrapper ( async function (req, res, next){
    
    const {id} = req.params; // question Id
    const question = await Question.findById(id);
    //  gets userId
    
    if(!question.likes.includes(req.user.id)){
        return next(new CustomError("This question was not liked before", 400));
    }

    // question.likes is an array.
    question.likes.remove(req.user.id);
    
    await question.save();


    return res
    .status(200)
    .json({
        success: true,
        likes: question.likes,
        info: "Question unliked"
    })

});



module.exports = {
    askNewQuestion,
    getSingleQuestion,
    editQuestion,
    deleteQuestion,
    likeQuestion,
    undoLikeQuestion
};
