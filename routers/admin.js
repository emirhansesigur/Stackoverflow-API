const {blockUser, deleteUser} = require("../controllers/admin");
const {getAccessToRoute ,getAdminAccess} = require("../middlewares/authorization/auth");
const {checkUserExist} = require("../middlewares/database/databaseErrorHelpers");
const express = require("express");


const router = express.Router();

router.use([getAccessToRoute,getAdminAccess]);
//router.use(checkUserExist); --> wrong. :id cannot sent to checkUserExist

router.put("/blockUser/:id", checkUserExist,blockUser);
router.delete("/deleteUser/:id", checkUserExist, deleteUser);



module.exports = router;
