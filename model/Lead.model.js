import mongoose from "mongoose";
const leadSchema = new mongoose.Schema({
  email: { type: String, required: true },
  score: { type: Number, required: true ,default: 1000000},    
  isSent: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Lead", leadSchema);
