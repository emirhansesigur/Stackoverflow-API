// bi fonks gelecek.


const getAllQuestions = ((req, res, next)=>{
    
    res
    .status(200)
    .json({
        success : true,
        name: "lorem100"
    });

})

module.exports = { // fazlaca fonksyonu boyle dondurecegimiz icin
    getAllQuestions
};