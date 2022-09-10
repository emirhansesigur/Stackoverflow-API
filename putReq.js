//     PUT req de öğrenildi :D
const users = [
    {id: 1, name: "Esranur", place: "Kocaeli"},
    {id: 2, name: "Emirhan", place: "Bursa"}
];



const { json } = require('body-parser') // pars: ayrıştırmak
const express = require('express')
const app = express()

app.use(express.json());


app.put("/users/:id",(req,res,next)=>{
    const idm = parseInt(req.params.id);

    for(let i = 0; i< 2; i++){
        if(users[i].id === idm){
            users[i] = {
                ...users[i], 
                ...req.body
            };
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