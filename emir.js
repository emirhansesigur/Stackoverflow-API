const User = require("../models/user");
const asyncErrorWrapper = require("express-async-handler");
const CustomError = require("../helpers/error/CustomError")

const app = express();

// const getSingleUser = (req, res){
    
//     const {id} = req.params;
//     const user = await User.findById(id);
    
//     if(!user){
//         return next(new CustomError("User is not found by the id.", 400));
//     }
    
//     res
//     .status(200)
//     .json({
//         success: true,
//         user: user
//     })
// }

const getSingleUser = errorWrapper(async(req,res,next) => {
    
    const {id} = req.params;
    
    const user = await User.findById(id);

    return res
    .status(200)
    .json({
        success : true,
        data : user
    });
});


app.get("/",getSingleUser);


app.listen(5000, ()=>{
    console.log(`started on ${PORT}`);
})





