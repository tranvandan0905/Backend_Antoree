const express = require("express");
const { GetAnalytics, PostAnalytics } = require("../controller/Analytics.controller");
const { GetQuizQuestion, PostQuizQuestion } = require("../controller/QuizQuestion.controller");
const routeAPI = express.Router();
routeAPI.get('/analytics',GetAnalytics)
routeAPI.post('/analytics',PostAnalytics)
routeAPI.get('/quizquestion',GetQuizQuestion)
routeAPI.post('/quizquestion',PostQuizQuestion)
module.exports=routeAPI;