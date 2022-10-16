// api/question

const express = require("express");
const answer = require("./answer");

const router = express.Router();
const {askNewQuestion, getSingleQuestion, editQuestion, deleteQuestion, likeQuestion, undoLikeQuestion} = require("../controllers/question.js");
const {getAccessToRoute, getQuestionOwnerAccess} = require("../middlewares/authorization/auth");
const {checkQuestionExist} = require("../middlewares/database/databaseErrorHelpers");

const app = express();

router.post("/ask", getAccessToRoute,askNewQuestion);

router.get("/:id", checkQuestionExist, getSingleQuestion);
router.put("/:id/edit", [getAccessToRoute, checkQuestionExist, getQuestionOwnerAccess], editQuestion);
router.delete("/:id/delete", [getAccessToRoute, checkQuestionExist, getQuestionOwnerAccess], deleteQuestion);
router.get("/:id/like", [getAccessToRoute, checkQuestionExist], likeQuestion);
router.get("/:id/undolike", [getAccessToRoute, checkQuestionExist], undoLikeQuestion);

router.use("/:question_id/answers", answer);


// router.get("/delete",(req, res)=>{
//     res.send("Question Delete Page")
// })

module.exports = router;
