const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
  task_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  progress_date: { type: Date, default: Date.now },
  progress_percentage: { type: Number, min: 0, max: 100, required: true },
});

const Progress = mongoose.model("Progress", progressSchema);
export default Progress;
