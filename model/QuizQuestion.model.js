
const mongoose = require("mongoose");
const quizQuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },          
  options: [{ type: String, required: true }],        
  answer: { type: String, required: true },           
  type: { type: String, default: "toeic" }             
});

module.exports = mongoose.model("QuizQuestion", quizQuestionSchema);
