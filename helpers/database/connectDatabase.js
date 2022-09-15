const mongoose = require("mongoose")

function connectDatabase(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Mongodb Connection Successful");
    })
    .catch(err=>{
        console.error(err); 
    })
    
};

module.exports = connectDatabase;