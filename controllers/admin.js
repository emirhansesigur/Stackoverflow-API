// block user
// delete user
const User = require("../models/user");
const asyncErrorWrapper = require("express-async-handler");



const blockUser = asyncErrorWrapper ( async function (req, res, next){
    const {id} = req.params;
    const user = await User.findById(id);

    user.blocked = !user.blocked;

    await user.save();
    
    return res
    .status(200)
    .json({
        success: true,
        message: "Block - Unblock successful",
        user: user
    })

});

const deleteUser = asyncErrorWrapper ( async function (req, res, next){
    const {id} = req.params;
    const user = await User.findById(id);
    
    await user.remove();

    return res
    .status(200)
    .json({
        success: true,
        message: "User is deleted",
    })
});


module.exports = {
    blockUser,
    deleteUser
};