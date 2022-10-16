const express = require("express");
const {addNewAnswerToQuestion, getAllAnswersByQuestion, getSingleAnswer, editAnswer, deleteAnswer, likeAnswer, undoLikeAnswer} = require("../controllers/answer");
const {getAccessToRoute} = require("../middlewares/authorization/auth"); 
const {checkQuestionAndAnswerExist} = require("../middlewares/database/databaseErrorHelpers");
const {getAnswerOwnerAccess} = require("../middlewares/authorization/auth");

const router = express.Router({mergeParams: true}); // being able to get req.params. 



router.post("/", getAccessToRoute, addNewAnswerToQuestion);
router.get("/", getAllAnswersByQuestion);
router.get("/:answer_id", checkQuestionAndAnswerExist, getSingleAnswer);
router.put("/:answer_id/edit", [getAccessToRoute, checkQuestionAndAnswerExist, getAnswerOwnerAccess], editAnswer);
router.delete("/:answer_id/delete", [getAccessToRoute, checkQuestionAndAnswerExist, getAnswerOwnerAccess], deleteAnswer);
router.get("/:answer_id/like", [checkQuestionAndAnswerExist, getAccessToRoute], likeAnswer);
router.get("/:answer_id/undoLike", [checkQuestionAndAnswerExist, getAccessToRoute],undoLikeAnswer);



module.exports = router;
