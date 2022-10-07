// api/question

const express = require("express");
const router = express.Router();
const {askNewQuestion, getSingleQuestion, editQuestion} = require("../controllers/question.js");
const {getAccessToRoute, getQuestionOwnerAccess} = require("../middlewares/authorization/auth");
const {checkQuestionExist} = require("../middlewares/database/databaseErrorHelpers");

const app = express();

router.post("/ask", getAccessToRoute,askNewQuestion);
router.get("/:id", checkQuestionExist, getSingleQuestion);
router.put("/:id/edit", [getAccessToRoute, checkQuestionExist, getQuestionOwnerAccess], editQuestion);

// question update feature and OwnerAccess middleware were added

// router.get("/delete",(req, res)=>{
//     res.send("Question Delete Page")
// })

module.exports = router;
