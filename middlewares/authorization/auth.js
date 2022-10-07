const CustomError = require("../../helpers/error/CustomError");
const jwt = require("jsonwebtoken")
const asyncErrorWrapper = require("express-async-handler");
const {isTokenIncluded, getAccessTokenFromHeader} = require("../../helpers/authorization/tokenHelpers");
const User = require("../../models/user");
const Question = require("../../models/question");
// bu bir middleware req, res, next i nasil aldigina dikkat et ,D
const {JWT_SECRET_KEY} = process.env;

const getAccessToRoute = asyncErrorWrapper ( async function (req, res, next){

    //Token var mı, gecerli mi bak, CustomError firlat
    if(!isTokenIncluded(req)){
        return next(new CustomError("you r not authorized to access this route ?", 401))
    }
        //console.log("you r authourized")
        const accessToken = getAccessTokenFromHeader(req);
        
            // -------- CALISMAYAN KOD
        // jwt.verify(accessToken,process.env.JWT_SECRET_KEY,(err,decodedToken)=>{

        //     if(err){
        //         return next(new CustomError("you r not authorized to access this route.",401));
        //     }
        //     console.log(decodedToken);
        //     next();
        // })
        
        // -------- CALISAN KOD
        console.log(accessToken);
        jwt.verify(accessToken,process.env.JWT_SECRET_KEY,(err,decodedToken)=>{ // dogrula
            if(err){
                return next(new CustomError(err,401)); //return next(console.log(new CustomError(err,100)));
            }
            // buradaki else i kaldırdınn

            console.log(decodedToken); 
            // decoded id, name;
            req.user = { // boyle bir degisken olusturuluyor her yerden erisebilmek icin
                id : decodedToken.id,  //***
                name : decodedToken.name
            };

            next();
            
        });

});

const getAdminAccess = asyncErrorWrapper ( async function (req, res, next){
    // get the user, check if he is admin if not no access error, if yes give admin access.


    
    const {id} = req.user; // user id su * dan geliyor
    const user = await User.findById(id);

    if(user.role!== "admin"){
        next(new CustomError("just admins can access this route", 403)); // 403 = forbidden
    }

    next();

});

const getQuestionOwnerAccess = asyncErrorWrapper ( async function (req, res, next){

    const userId = req.user.id;
    const questionId = req.params.id;

    const question = await Question.findById(questionId);

    if(question.user != userId){
        return next(new CustomError("Only owner can handle to this route.", 403)); // 403 forbidden
    }
    next();
    
});


module.exports = {
    getAccessToRoute,
    getAdminAccess,
    getQuestionOwnerAccess
};
