import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  project_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  assigned_date: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["pending", "accepted", "completed"],
    required: true,
  },
});

const Assignment = mongoose.model("Assignment", assignmentSchema);
export default Assignment;
