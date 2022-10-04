const User = require("../models/user") // {User} yaparak çözdük
const CustomError = require("../helpers/error/CustomError")
const asyncErrorWrapper = require("express-async-handler");
const {sendJwtToClient} = require("../helpers/authorization/tokenHelpers")
const {validateUserInput, comparePassword} = require("../helpers/input/inputHelper");
const sendEmail = require("../helpers/libraries/sendEmail")

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
    //return next(new CustomError("User Not Found With That Email",400));

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

const imageUpload = asyncErrorWrapper ( async function (req, res, next){

    // updataing the image'a name in the server
    const user = await User.findOneAndUpdate(req.user.id , {
        "profile_image" : req.savedProfileImage
    } , {
        new: true,
        runValidators: true
    });

    res
    .status(200)
    .json({
        success: true,
        message: "foto is uploaded successfully",
        data: user
    })


})


// const forgotPassword = asyncErrorWrapper ( async function (req, res, next){
//     // await ile bekleyince sadece null getirdi
//     // await ile bekleMEyinde null kullanıcı getirdi 

//     const resetEmail = req.body.email;
//     const user = await User.findOne({email: resetEmail});
    
//     if(!user){ // if == null
//         return next(new CustomError("A user with that email is not exist."));
//     }
    
//     const resetPasswordToken = user.getResetPasswordToken();

//     await user.save();
    
//     const resetPasswordUrl = `https// localhost:5000/api/auth/forgotpassword?resetPasswordToken?${resetPasswordToken}`;
    
//     const emailTemplate = `
//         <h3>RESET YOUR PASSWORD</h3>
//         <p> Click this link: <a href = '${resetPasswordUrl}' target = '_blank'></p>
//     `;

//     try{
//         sendEmail({
//             from: process.env.SMTP_USER, // sender address
//             to: resetEmail, // to entered email.
//             subject: "Reset Your Stack Overflow Account Password ", // Subject line
//             html: emailTemplate, // html body
//           });
//         return res
//             .status(200)
//             .json({
//             success: true,
//             message: "an email is sent to your mail"
//         })

//     }catch(err){ // if email is not sent we need to renew resetPasswordToken, resetPasswordExpire 
//         user.resetPasswordToken = undefined;
//         user.resetPasswordExpire = undefined;

//         await user.save();

//         return next(new CustomError("there is a problem when sending the mail. Please try it again.", 500));

//     }

    


// })

const forgotPassword = asyncErrorWrapper(async (req,res,next) => {

    const resetEmail = req.body.email;
    const user = await User.findOne({email: resetEmail});

    if (!user) {
        return next(new CustomError("User Not Found With That Email",400));

    }
    const resetPasswordToken = user.getResetPasswordToken();

    await user.save();

    
    const resetPasswordUrl = `http://localhost:5000/api/v1/auth/resetPassword?resetPasswordToken=${resetPasswordToken}`;


    const emailTemplate = `
        <h3>Reset Your Password</h3>
        <p>This <a href = '${resetPasswordUrl}' target = '_blank'>link</a>  will expire in 1 hour</p>
    `;
    try {
        await sendEmail({
            from: process.env.SMTP_EMAIL, 
            to: resetEmail, 
            subject: "Reset Password Token",
            html: emailTemplate
        });
        return res.status(200)
        .json({
            success : true,
            message : "Email Sent",
            data : user
        });
    }
    catch(err) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        return next(new CustomError("Email Could Not Be Sent",500));
    }    
});

const resetPassword = asyncErrorWrapper(async (req,res,next) => {

    const {resetPasswordToken} = req.query;

    // password yenileme
    // e posta yoluyla kullanıcı token a sahiptir. buna erişeceğiz
    // resetPasswordToken != undefine
    // token dogru ise ve sindika zamandan kucukse
    //(AWAIT) save le ve islem bitsin
    
    const {password} = req.body;
    //console.log(password);

    if(!resetPasswordToken){
        return next(new CustomError("Please provide a valid token", 400));
    }
    
    let user = await User.findOne({
        resetPasswordToken: resetPasswordToken,
        resetPasswordExpire: {$gt: Date.now()}

    })
    if(!user){
        return next(new CustomError("Invaild token or Session Expired, 400"));
    }

    user.password = password;
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;

    await user.save();
    
    res
    .status(200)
    .json({
        success: true,
        message: 'You reset your password successfully',
        resetPasswordToken: resetPasswordToken
        })

});


module.exports = { // fazlaca fonksyonu boyle dondurecegimiz icin
    register,
    getUser,
    login,
    logout,
    imageUpload,
    forgotPassword,
    resetPassword
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