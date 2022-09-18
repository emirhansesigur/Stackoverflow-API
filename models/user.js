const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name : {
        type: String,
        required: [true, "Please provide a name"]
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
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
        required: [true, "Please provide a password"],
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

UserSchema.pre("save", function(next){
    console.log(this);
    // mongoose un fonksyonu imis isModified
    // tam oturmadi arastirrrrrr
    if(this.isModified("password")){
        next();
        console.log("password was not changed :D");
    }
    bcrypt.genSalt(10, (err, salt)=>{
        if(err) next(err);
        bcrypt.hash(this.password, salt, (err, hash)=>{
            if(err) next(err);
            this.password = hash;
            next()
        });
    });
});


// Save user to mongodb database
const User = mongoose.model("User",UserSchema ) // burada "User" yazdık  amam users kollection ı olusturacak

module.exports =  User


