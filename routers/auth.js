const express = require("express");
const router = express.Router();
const {register} = require("../controllers/auth.js")


const app = express();

router.post("/register", register); // POST: yeni ekleme old icin


module.exports = router;

