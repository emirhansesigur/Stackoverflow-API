

const register = ((req, res, next)=>{
    res
    .status(200)
    .json({
        success : true,
        name: "loremke"
    });

})

module.exports = { // fazlaca fonksyonu boyle dondurecegimiz icin
    register
};
