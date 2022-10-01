const express = require("express");
const router = express.Router();
const {register , getUser, login, logout, imageUpload, forgotPassword, resetPassword} = require("../controllers/auth.js");
const {getAccessToRoute} = require("../middlewares/authorization/auth");
const profileImageUpload = require("../middlewares/libraries/profiImageUpload");

const app = express();

router.post("/register", register); // POST: yeni ekleme old icin
router.get("/profile" ,getAccessToRoute ,getUser)
router.post("/login", login)
router.get("/logout", getAccessToRoute, logout)
router.post("/upload", [getAccessToRoute, profileImageUpload.single("profile_image")], imageUpload)
router.post("/forgotpassword", forgotPassword)
router.put("/resetPassword", resetPassword);

module.exports = router;
