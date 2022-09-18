const User = require("../models/user") // {User} yaparak çözdük
const CustomError = require("../helpers/error/CustomError")
const asyncErrorWrapper = require("express-async-handler");

// Save user to mongodb database

// async çöz
// sonra da gercek regester alacak hale getir. verileri postman den ver :D
// kolay gelsin

const register =asyncErrorWrapper ( async function (req, res, next){
    

    const name = "Sra"
    const email = "emirhanlamali@gmail.com"
    const password = "1212"

// before asyncErrorWrapper
// try{    
//     const user = await User.create({
//         name,
//         email,
//         password
//     });

//     res
//     .status(200)
//     .json({
//         success: true,
//         data: user
//     });
    
// }
// catch(err){
//     return next(new CustomError("validation error",123))
// }


// after asyncErrorWrapper    
    const user =  await User.create({
        name,
        email,
        password
    });

    res
    .status(200)
    .json({
        success: true,
        data: user
    });




})

const errorTest = (req, res, next)=>{
    return next(new TypeError("Type Error"))
    
}


module.exports = { // fazlaca fonksyonu boyle dondurecegimiz icin
    register,
    errorTest
};
