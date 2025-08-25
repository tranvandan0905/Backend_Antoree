import mongoose from "mongoose";

const requestDetailSchema = new mongoose.Schema({
  email: { type: String, required: true },  
  isSent: { type: Boolean, default: false },          
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("RequestDetail", requestDetailSchema);
