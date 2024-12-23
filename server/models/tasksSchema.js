import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  project_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  task_name: { type: String, required: true },
  description: { type: String },
  due_date: { type: Date, required: true },
  status: { type: String, enum: ["pending", "completed"], required: true },
});

const Task = mongoose.model("Task", taskSchema);
export default Task;
