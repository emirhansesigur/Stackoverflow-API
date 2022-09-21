const express = require("express");
const router = express.Router();
const {register , tokenTest} = require("../controllers/auth.js")
const {getAccessToRoute} = require("../middlewares/authorization/auth")

const app = express();

router.post("/register", register); // POST: yeni ekleme old icin
router.get("/tokentest" ,getAccessToRoute ,tokenTest)



module.exports = router;
