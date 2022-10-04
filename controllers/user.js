const User = require("../models/user");
const CustomError = require("../helpers/error/CustomError")
const asyncErrorWrapper = require("express-async-handler");
const { models } = require("mongoose");

const getSingleUser = asyncErrorWrapper ( async function (req, res, next){

    // const {id} = req.params.id;
    const {id} = req.params;

    const user = await User.findById(id);
    // middleware yapıldı. 
    // if(!user){
    //     next(new CustomError("User is not found by that id", 400))
    // }

    return res
    .status(200)
    .json({
        success:true,
        user: user
    })
});

const getAllUsers = asyncErrorWrapper ( async function (req, res, next){
    const users = await User.find();

    return res
    .status(200)
    .json({
        success:true,
        users: users
    })
});

module.exports = {
    getSingleUser,
    getAllUsers
};