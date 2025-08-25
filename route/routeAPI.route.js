const express = require("express");
const { GetAnalytics, PostAnalytics } = require("../controller/Analytics.controller");
const routeAPI = express.Router();
routeAPI.get('/analytics',GetAnalytics)
routeAPI.post('/analytics',PostAnalytics)
module.exports=routeAPI;