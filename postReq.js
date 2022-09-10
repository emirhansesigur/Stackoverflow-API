// body den row diyip bi JSON gönderman gerekiyor darling :D

const users = [
    {id: 1, name: "Esranur", place: "Kocaeli"},
    {id: 2, name: "Emirhan", place: "Bursa"}
]

const { json } = require('body-parser')
const express = require('express')
const app = express()
app.use(express.json()) // it is a middleware we need to use for res.body OK?

// simdi nasıl postman dan veri alınıp onu yazdıracağız.


app.post("/users", (req, res, next)=>{ // 
    const user = req.body; // herhalde POSTMAN'de body den veriyi attigimiz 
                            // icin body yazıyoruz.
    // yalancıktan users a ekilyor gibi yapmak
    users.push(user);
    // res.json({
    //     success:true,
    //     data: "PUT request"
    // })
    console.log(users);
})


app.listen(5000, ()=>{
    console.log("listening on port 5000")
})



