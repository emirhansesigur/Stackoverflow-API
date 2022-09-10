const express = require('express')
const dotenv = require("dotenv")
const index = require("./routers/index.js");

// config in nerede oldugunu gosterecegiz.
dotenv.config({
    path: "./config/env/config.env"
});

const app = express()
const PORT = process.env.PORT || 5000;


// middleware yapıyore
app.use("/api" , index);

app.get("/",(req,res)=>{
    res.send("/ is used")
})

app.listen(5000, ()=>{
    console.log(`started on ${PORT}`);
})