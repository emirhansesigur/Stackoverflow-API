// api/question

const express = require("express");
const router = express.Router();
const {askNewQuestion} = require("../controllers/question.js");
const {getAccessToRoute} = require("../middlewares/authorization/auth");

const app = express();

router.post("/ask", getAccessToRoute,askNewQuestion);

// router.get("/delete",(req, res)=>{
//     res.send("Question Delete Page")
// })

module.exports = router;