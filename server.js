const express = require('express')
const dotenv = require("dotenv")
const index = require("./routers/index.js");
const connectDatabase = require("./helpers/database/connectDatabase.js");
const customeErrorHandler = require("./middlewares/error/customErrorHandler");
const path = require("path");

// config in nerede oldugunu gosterecegiz.
dotenv.config({
    path: "./config/env/config.env"
});

// Connection to database
connectDatabase();


const app = express()

// Express Body Middleware
app.use(express.json())

const PORT = process.env.PORT;

// middleware yapıyore
app.use("/api" , index);

app.use(customeErrorHandler);

//Static files
app.use(express.static(path.join(__dirname, "public")));

app.listen(5000, ()=>{
    console.log(`started on ${PORT}`);
})
