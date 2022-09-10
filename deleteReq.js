    // :D
//      /v/:id buradaki id STRING olarak gelir.
const users = [
    {id: 1, name: "Esranur", place: "Kocaeli"},
    {id: 2, name: "Emirhan", place: "Bursa"}
];



const { json } = require('body-parser') // pars: ayrıştırmak
const express = require('express')
const app = express()

app.use(express.json());

app.delete("/:id",(req,res,next)=>{
    const girilenId = parseInt(req.params.id);

    for(let i = 0; i< users.length; i++){
        if(users[i].id === girilenId){
            users.splice(i, 1);
       }
    }

    res.json({
        success: true,
        data: users
    })


})





app.listen(5000,()=>{
    console.log("listin 5000");
})