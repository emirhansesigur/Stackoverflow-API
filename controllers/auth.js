const User = require("../models/user") // {User} yaparak çözdük
const CustomError = require("../helpers/error/CustomError")
const asyncErrorWrapper = require("express-async-handler");
const {sendJwtToClient} = require("../helpers/authorization/tokenHelpers")
// Save user to mongodb database

// async çöz
// sonra da gercek regester alacak hale getir. verileri postman den ver :D
// kolay gelsin

const register = asyncErrorWrapper ( async function (req, res, next){
    
    const {name, email, password, role} = req.body;



// after asyncErrorWrapper    
    const user =  await User.create({
        name,
        email,
        password,
        role
    });

    
    sendJwtToClient(user, res);

})

const tokenTest = (req, res, next)=>{
    res.send("Welcome bizim oglan")
}

module.exports = { // fazlaca fonksyonu boyle dondurecegimiz icin
    register,
    tokenTest
};



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