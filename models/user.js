const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const crypto = require("crypto")

const UserSchema = new Schema({
    name : {
        type: String,
        required: [true, "Please provide a name"]
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please provide a valid email"
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
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpire: {
        type: Date
    }
    
});

// UserSchema Methods
UserSchema.methods.generateJwtFromUser = function(){
    const {JWT_SECRET_KEY, JWT_EXPIRE} = process.env;
    //const JWT_SECRET_KEY = "emir";
    //const JWT_EXPIRE = "1000s";

    const payload = {
        id : this._id,
        name : this.name
    };
    
    //jwt.sign(payload, secretOrPrivateKey, [options, callback])
    const token = jwt.sign(payload, JWT_SECRET_KEY, {
        expiresIn : JWT_EXPIRE
    });
    return token;
}

UserSchema.methods.getResetPasswordToken = function(){
    // create 15 digit word.

    const randomHexString = crypto.randomBytes(16).toString("hex");
    
    const resetPasswordToken = crypto
    .createHash("SHA256")
    .update(randomHexString) // token i ustte urettigimiz randomHexString den uretecegiz.
    .digest("hex")

    this.resetPasswordToken = resetPasswordToken;
    // wrong: this.resetPasswordExpire = process.env.JWT_RESET_PASSWOR_EXPIRE
    // wrong: this.resetPasswordToken = new Date(Date.now() + process.env.JWT_RESET_PASSWOR_EXPIRE);
    this.resetPasswordExpire = new Date(Date.now() + parseInt(process.env.JWT_RESET_PASSWOR_EXPIRE));

    return resetPasswordToken;
}

// this kaydedilmeye hazır user ı gosteriyor. bunu unutma
UserSchema.pre("save", function(next){ // this is important when reset the password.
    if(!this.isModified("password")){
        console.log("password was not changed :D");
        next();
    }
    bcrypt.genSalt(10, (err, salt)=>{
        if(err) next(err);
        
        bcrypt.hash(this.password, salt, (err, hash)=>{
            if(err) next(err);
            this.password = hash;
            next();
        })
    });

})

// Save user to mongodb database
const User = mongoose.model("User",UserSchema ) // burada "User" yazdık ama users kollection ı olusturacak

module.exports =  User


