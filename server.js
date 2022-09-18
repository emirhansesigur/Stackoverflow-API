const express = require('express')
const dotenv = require("dotenv")
const index = require("./routers/index.js");
const connectDatabase = require("./helpers/database/connectDatabase.js");
const customeErrorHandler = require("./middlewares/error/customErrorHandler");

// config in nerede oldugunu gosterecegiz.
dotenv.config({
    path: "./config/env/config.env"
});

// Connection to database
connectDatabase();


const app = express()
const PORT = process.env.PORT;

// middleware yapıyore
app.use("/api" , index);

app.use(customeErrorHandler)


app.listen(5000, ()=>{
    console.log(`started on ${PORT}`);
})