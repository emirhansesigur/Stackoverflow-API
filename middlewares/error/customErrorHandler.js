// bir sürü if li yapı yaparak error ları merkezileştirdik burada :D
const CustomError = require("../../helpers/error/CustomError.js")

const customErrorHandler = (err,req,res,next) => {
    let customError = err; // demek ki err bi obje olarak geliyor
    console.log(customError);

    
    if(err.message === "Syntax Error") {
        customError = new CustomError("Unexpected Syntax") // java S class ları izlemedigin icin btw
        customError.status = 122;
    }

    if(customError.message === "validation error") {
        customError = new CustomError("Validation Syntax",12122);
    }
    if(customError.code === 11000){
        customError = new CustomError("duplicate key error. Please check your input", 400);
    }
    if(customError.name === "CastError"){ // if id is valid to mongodb's style.
        customError = new CustomError("Please provide a valid user id.", 400);
    }
    console.log(customError.message, customError.status)

    res
    .status(customError.status || 500) // status null ise 500 yazacak
    .json({
        success: false,
        message: customError.message

})
}
module.exports = customErrorHandler;