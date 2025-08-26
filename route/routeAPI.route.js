const express = require("express");
const { GetAnalytics, PostAnalytics } = require("../controller/Analytics.controller");
const { GetQuizQuestion, PostQuizQuestion, CheckQuizAnswers } = require("../controller/QuizQuestion.controller");
const { GetLead } = require("../controller/Lead.controller");
const { GetRequestDetail, PostRequestDetail } = require("../controller/RequestDetail.comtroller");
const { handleMoMoIPN, momo } = require("../controller/Banking.controller");
const routeAPI = express.Router();
routeAPI.get('/analytics',GetAnalytics)
routeAPI.get('/quizquestion',GetQuizQuestion)
routeAPI.post('/quizquestion',PostQuizQuestion)
routeAPI.post('/checkQuizAnswers',CheckQuizAnswers)
routeAPI.get('/lead',GetLead)
routeAPI.get('/requestDetail',GetRequestDetail)
routeAPI.post('/requestDetail',PostRequestDetail)
routeAPI.post('/momolead',momo);
routeAPI.post('/momo/ipn',handleMoMoIPN);
module.exports=routeAPI;