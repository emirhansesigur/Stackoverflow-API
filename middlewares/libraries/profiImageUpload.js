const multer = require("multer");
const path = require("path");
const CustomError = require("../../helpers/error/CustomError");
const customError = require("../../helpers/error/CustomError");


// Storage, filefilter
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{ // bu bir callback oldugu icin bunları almıs ??
        const rootDir = path.dirname(require.main.filename);
        cb(null, path.join(rootDir, "/public/uploads"));
    },
    filename: (req, file, cb)=>{
        // File - Mimetype -> image/jpg, image/png vs.

        const extension = file.mimetype.split("/")[1];
        req.savedProfileImage = "image_" + req.user.id + "." + extension; // req.user.id getAccesstoRoute den gelir
        cb(null, req.savedProfileImage);

    }
});

const fileFilter = (req, file, cb) =>{
    // Structure of a MIME type: type/subtype
    let allowedTypes = ["image/jpg", "image/gif", "image/jpng", "image/png"];
    if(!allowedTypes.includes(file.mimetype)){
        return cb(new CustomError("Please provide a valid image file" ,400), false);
    }
    return cb(null, true)
};

const profileImageUpload = multer({storage, fileFilter});

module.exports = profileImageUpload;

