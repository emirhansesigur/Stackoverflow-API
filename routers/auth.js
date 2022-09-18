const express = require("express");
const router = express.Router();
const {register , errorTest} = require("../controllers/auth.js")


const app = express();

router.post("/register", register); // POST: yeni ekleme old icin
router.get("/error", errorTest)



module.exports = router;

