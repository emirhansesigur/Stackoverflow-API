const express = require("express");
const router = express.Router();
const {register , getUser, login, logout} = require("../controllers/auth.js")
const {getAccessToRoute} = require("../middlewares/authorization/auth")

const app = express();

router.post("/register", register); // POST: yeni ekleme old icin
router.get("/profile" ,getAccessToRoute ,getUser)
router.post("/login", login)
router.get("/logout", getAccessToRoute, logout)

module.exports = router;
