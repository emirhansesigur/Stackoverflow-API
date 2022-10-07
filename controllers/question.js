const Question = require("../models/question");
const asyncErrorWrapper = require("express-async-handler");


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

module.exports = {
    askNewQuestion,
    getSingleQuestion,
    editQuestion
};
