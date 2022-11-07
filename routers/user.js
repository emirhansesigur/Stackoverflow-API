const express = require("express");
const {getSingleUser, getAllUsers} = require("../controllers/user");
const router = express.Router();
const {checkUserExist} = require("../middlewares/database/databaseErrorHelpers");
const User = require("../models/user");
const {userQueryMiddleware} = require("../middlewares/query/userQueryMiddleware");

router.get("/:id", checkUserExist,getSingleUser);
router.get("/", userQueryMiddleware(User),getAllUsers);

module.exports = router;
