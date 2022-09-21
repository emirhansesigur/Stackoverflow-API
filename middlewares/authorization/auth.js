const CustomError = require("../../helpers/error/CustomError");
const jwt = require("jsonwebtoken")
const {isTokenIncluded, getAccessTokenFromHeader} = require("../../helpers/authorization/tokenHelpers")
// bu bir middleware req, res, next i nasil aldigina dikkat et ,D
const {JWT_SECRET_KEY} = process.env;

const getAccessToRoute = (req, res, next) =>{

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
        jwt.verify(accessToken,process.env.JWT_SECRET_KEY,(err,decodedToken)=>{
            if(err){
                return next(console.log(new CustomError(err,100)));
            }
            else{
                console.log(decodedToken);
                next();
            }
        });

};

module.exports = {
    getAccessToRoute
};
