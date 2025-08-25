// analytics.model.js
import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema({
  ip: { type: String },               // IP người truy cập
  userAgent: { type: String },        // Trình duyệt
  visitedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Analytics", analyticsSchema);
