const User = require("../models/user") // {User} yaparak çözdük
const CustomError = require("../helpers/error/CustomError")
const asyncErrorWrapper = require("express-async-handler");
const {sendJwtToClient} = require("../helpers/authorization/tokenHelpers")
const {validateUserInput, comparePassword} = require("../helpers/input/inputHelper");
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

const getUser = (req, res, next)=>{
    
    res.json({
        success: true,
        data :{
            name: req.user.name,
            id: req.user.id
        }
    })
    


}

const login = asyncErrorWrapper ( async function (req, res, next){
    const {email, password } = req.body;

    if(validateUserInput(email, password) == undefined){
        return next(new CustomError("Check you input", 400));
    }
    
    const user = await User.findOne({ email }).select("+password") // User bi collection, hepsini iceriyor gibi dusun email gittik bulduk

    //console.log(user);
    if(!comparePassword(password, user.password)){
        return next(new CustomError("Please check your credentials",400))
    }

    sendJwtToClient(user, res);
    

        


})

const logout = asyncErrorWrapper ( async function (req, res, next){
    const {NODE_ENV} = process.env;

    res
    .status(200)
    .cookie({
        httpOnly: true,
        secure: NODE_ENV === "development" ? false : true,
        expires : new Date(Date.now())
})
.json({
    success: true,
    message: "logout successful"
})
})

module.exports = { // fazlaca fonksyonu boyle dondurecegimiz icin
    register,
    getUser,
    login,
    logout
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