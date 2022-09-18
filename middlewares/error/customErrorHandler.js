// bir sürü if li yapı yaparak error ları merkezileştirdik burada :D
const CustomError = require("../../helpers/error/CustomError.js")

const customErrorHandler = (err,req,res,next) => {
    let customError = err; // demek ki err bi obje olarak geliyor
    
    if(err.message === "Syntax Error") {
        customError = new CustomError("Unexpected Syntax") // java S class ları izlemedigin icin btw
        customError.status = 122;
    }

    if(customError.message === "validation error") {
        customError = new CustomError("Validation Syntax",12122);
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