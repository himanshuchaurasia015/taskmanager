import project from "../models/projectSchema.js";

//get all projects
export const getProjects = async (req, res) => {
  await project
    .find()
    .populate("created_by")
    .then((project) => {
      return res.status(200).json({
        project,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({
        msg: "unexpected error",
      });
    });
};

//create a new project
export const createProject = async (req, res) => {
  const { project_name, description, end_date, created_by } = req.body;
  if (!project_name || !description || !end_date || !created_by) {
    return res.status(400).json({
      msg: "All fields are required",
    });
  }
  try {
    const newProject = await project.create(req.body);
    const populatedProject = await project
      .findById(newProject._id)
      .populate("created_by");
    return res
      .status(201)
      .json({ msg: "Project created", project: populatedProject });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      msg: "Unexpected error occurred",
    });
  }
};

//get details of a project
export const getProjectDetails = async (req, res) => {
  const projectId = req.prams.projectId;
  if (!projectId) {
    return res.status(400).json({
      msg: "projectId not found",
    });
  }
  await project
    .findById({ _id: projectId })
    .populate("created_by")
    .then((project) => {
      return res.status(200).json({
        project,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({
        msg: "unexpected error",
      });
    });
};
export const updateProjectDetails = (req, res) => {};
export const deleteProject = (req, res) => {};
// export const assignedProjects = (req, res) => {};
// export const acceptProject = (req, res) => {};
