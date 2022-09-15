//const {User} = require("../models/user") // {User} yaparak çözdük
const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const UserSchema = new Schema({
    name : {
        type: String,
        //required: [true, "Please provide a name"]
    },
    email: {
        type: String,
        //required: [true, "Please provide an email"],
        unique: [true, "Please try different email"],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please provide a valid name"
        ]
    },
    role: {
        type: String,
        default: "user", // admin şeklinde  belirtmediginde user olarek rol belirlenir
        enum : ["user", "admin"], // 2 farkli deger alabilir, bu ikisi sadece
    },
    password: {
        type: String,
        minlength: [6, "enter a password with min lenght 6"],
        //required: [true, "Please provide a password"],
        select: false //degerleri cekmek istedigimiz zaman sifre alınamayacak
    },
    createdAt: {
        type: Date,
        default: Date.now // yaratildigi tam zamani alabilmek icin default olarak o an
    },
    title: {
        type: String
    },
    about: {
        type: String
    },
    place: {
        type: String
    },
    website: {
        type: String
    },
    profile_image: {
        type: String,
        default: "default.jpg" //kullanıcı foto eklemek zorunda degil
    },
    blocked: { // kullanicinin blokladigi biri var mı
        type: Boolean,
        default: false
    }
});

// Save user to mongodb database
const User = mongoose.model("User",UserSchema )



const register =  function (req, res, next){
    
    const name = "emir"
    const email = "aabsbds@gmail.com"
    const password = "1234567"

    const user =  User.create({
        name,
        email,
        password
    })

    
    res
    .status(200)
    .json({
        success: true,
        data: user
    });
    


}

module.exports = { // fazlaca fonksyonu boyle dondurecegimiz icin
    register
};
