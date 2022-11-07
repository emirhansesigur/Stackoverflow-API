// api/question

const express = require("express");
const answer = require("./answer");
const Question = require("../models/Question");

const router = express.Router();
const {askNewQuestion, getSingleQuestion, editQuestion, deleteQuestion, likeQuestion, undoLikeQuestion, getAllQuestions} = require("../controllers/question.js");
const {getAccessToRoute, getQuestionOwnerAccess} = require("../middlewares/authorization/auth");
const {checkQuestionExist} = require("../middlewares/database/databaseErrorHelpers");
const {questionQueryMiddleware} = require("../middlewares/query/questionQueryMiddleware");

const app = express();

router.get("/", questionQueryMiddleware(Question, {
    population: {
        path: "user",
        select: "name _id"
    }
}),getAllQuestions);

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
