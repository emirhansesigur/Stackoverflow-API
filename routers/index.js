const express = require("express");

const question = require("./question");
const auth = require("./auth");
const user = require("./user");
const admin = require("./admin");

const router = express.Router();
const app = express();

// middleware yapıyore
// api geldigi zaman index e git

router.use("/auth", auth);
router.use("/question", question);
router.use("/users", user);
router.use("/admin", admin);


module.exports = router;
