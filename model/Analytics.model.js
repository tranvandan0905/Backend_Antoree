const mongoose = require("mongoose");

const analyticsSchema = new mongoose.Schema({
  ip: { type: String },               // IP người truy cập
  userAgent: { type: String },        // Trình duyệt
  visitedAt: { type: Date, default: Date.now }
});

module.exports= mongoose.model("Analytics", analyticsSchema);
