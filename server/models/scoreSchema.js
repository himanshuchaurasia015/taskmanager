import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  project_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  score: { type: Number, min: 0, max: 100, required: true },
  score_date: { type: Date, default: Date.now },
});

const Score = mongoose.model("Score", scoreSchema);
export default Score;
