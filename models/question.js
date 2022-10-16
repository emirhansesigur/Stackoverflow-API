const mongoose = require("mongoose");
const slugify = require('slugify')

const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    title: {
        type: String,
        required: [true, "you need to provide a title."],
        minlength: [10, "you need to provide a title at list 10 characters."],
        unique: true
    },
    content: {
        type:String,
        required: [true, "You need to enter a content"],
        minlength: [20 ,"you need to provide a content at list 20 characters"]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    slug : String,
    user : {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "User"
    },
    likes: [
        {
        //keep in an array to the ones who has liked to the question.
        
            type: mongoose.Schema.ObjectId,
            ref: "User"
    }],
    answer: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Answer" // answer collection ına referans verir.
        }
    ]
})

QuestionSchema.pre("save", function(next){
    //important
    if(!this.isModified("title")){
        next();
    }
    this.slug = this.makeSlug();
    next();
})

QuestionSchema.methods.makeSlug = function(){
    return slugify(this.title, {
        replacement: '-',  
        remove: /[*+~.()'"!:@]/g, // remove characters that match regex, defaults to `undefined`
        lower: true,      // convert to lower case, defaults to `false`
        
      })
      
}

const Question = mongoose.model("Question", QuestionSchema);

module.exports =  Question;
