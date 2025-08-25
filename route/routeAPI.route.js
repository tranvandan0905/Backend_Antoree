const express = require("express");
const { GetAnalytics, PostAnalytics } = require("../controller/Analytics.controller");
const { GetQuizQuestion, PostQuizQuestion } = require("../controller/QuizQuestion.controller");
const { GetLead, PostLead } = require("../controller/Lead.controller");
const { GetRequestDetail, PostRequestDetail } = require("../controller/RequestDetail.comtroller");
const routeAPI = express.Router();
routeAPI.get('/analytics',GetAnalytics)
routeAPI.get('/quizquestion',GetQuizQuestion)
routeAPI.post('/quizquestion',PostQuizQuestion)
routeAPI.get('/lead',GetLead)
routeAPI.post('/lead',PostLead)
routeAPI.get('/requestDetail',GetRequestDetail)
routeAPI.post('/requestDetail',PostRequestDetail)
module.exports=routeAPI;