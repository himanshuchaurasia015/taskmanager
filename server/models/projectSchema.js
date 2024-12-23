import mongoose from "mongoose";
const projectSchema = new mongoose.Schema({
  project_name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  end_date: {
    type: Date,
    required: true,
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Project = mongoose.model("Project", projectSchema);
export default Project;
