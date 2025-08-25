import mongoose from "mongoose";
const leadSchema = new mongoose.Schema({
  email: { type: String, required: true },
  score: { type: Number, required: true },      // điểm quiz
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Lead", leadSchema);
