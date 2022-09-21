//res.cookie(name, value [, options])

const sendJwtToClient = (user, res) =>{
    const {JWS_COOKIE, NODE_ENV} = process.env;

    const token = user.generateJwtFromUser();
    
    res
    .status(200)
    .cookie("access_Token", token,{
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

const isTokenIncluded = (req)=>{
    if(req.headers.authorization == undefined){
        return false;
    }

    return req.headers.authorization && req.headers.authorization.startsWith("Bearer:");  
    //  req.headers.authorization == string but not startswith bearer f
    // ikisi de dogru ise true== included, np
}

const getAccessTokenFromHeader = (req)=>{
    // const authorization = req.headers.authorization;
    // const access_token = authorization.split(" ")[1];

    const authorization = req.headers.authorization;//tokeni aldık
    const access_token = authorization.substr(8)

    return access_token;
}


module.exports = {
    sendJwtToClient,
    isTokenIncluded,
    getAccessTokenFromHeader
};
