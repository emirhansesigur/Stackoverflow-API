const mongoose = require("mongoose");
const Question = require("./Question");

const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
    content: {
        type: String,
        required: [true, "You need to enter a content"],
        minlength: [10 ,"you need to provide a content at list 10 characters"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    likes: [ // the others may like the answer. the array is the list who was liked it.
        {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }],
    user: { //who was added it
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    question: { // which question it is answer to?
        type: mongoose.Schema.ObjectId,
        ref: "Question",
        required: true
    }
})

AnswerSchema.pre("save", async function(next){
    if(!this.isModified("user")) return next(); //buraya dikkat et


    const question = await Question.findById(this.question); //this.question: we save it in controllers, from req.params
    
    question.answer.push(this._id); // olusacak olan id si
    question.answerCount = question.answer.length;
    
    await question.save();
    next();

})


const Answer = mongoose.model("Answer", AnswerSchema);

module.exports = Answer;
