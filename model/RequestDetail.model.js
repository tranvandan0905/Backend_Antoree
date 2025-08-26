const mongoose = require("mongoose");
const requestDetailSchema = new mongoose.Schema({
  email: { type: String, required: true },  
  isSent: { type: Boolean, default: false },          
  createdAt: { type: Date, default: Date.now }
});

module.exports= mongoose.model("RequestDetail", requestDetailSchema);
