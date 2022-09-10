
const express = require("express");

const question = require("./question.js");
const auth = require("./auth.js");

const router = express.Router();

const app = express();
// middleware yapıyore
// api geldigi zaman index e git

router.use("/auth", auth);
router.use("/question", question);




module.exports = router;