//res.cookie(name, value [, options])

const sendJwtToClient = (user, res) =>{
    const {JWS_COOKIE, NODE_ENV} = process.env;

    const token = user.generateJwtFromUser();
    
    res
    .status(200)
    .cookie("accessToken", token,{
        httpOnly: true,
        secure: NODE_ENV === "development" ? false : true,
        expires : new Date(Date.now() + parseInt(JWS_COOKIE) * 1000)
})
    .json({
        success: true,
        access_token: token,
        data: {
            name : user.name,
            email : user.email
        }
    });

}
module.exports = sendJwtToClient;