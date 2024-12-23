import assignment from "../models/assignmentSchema.js";

export const getAssignments = (req, res) => {};

// Assigned a project to a user
export const createAssignment = async (req, res) => {
  let assigned = req.body();
  if (!assigned.project_id || !assigned.user_id || !assigned.status) {
    return res.status(400).json({
      msg: "all fields are required",
    });
  }
  await assignment
    .create(req.body)
    .populate("project_id")
    .populate("user_id")
    .then((assigned) => {
      return res.status(200).json({
        msg: "project assigned",
        assigned,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({
        msg: "unexpected error",
      });
    });
};

// get all assigned projects
export const getAssignedProjects = async (req, res) => {
  const id = req.params.userId;
  if (!id) {
    return res.status(400).json({
      msg: "userId not found",
    });
  }
  await assignment
    .find({ user_id }, "project_id status assigned_date")
    .populate("project_id")
    .then((projects) => {
      return res.status(200).json({
        projects,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({
        msg: "unexpected error",
      });
    });
};

export const getAssignmentDetail = (req, res) => {};

// update status of assignment
export const updateAssignment = async (req, res) => {
  if (!req.body.status || !req.params.assignmentId) {
    return res.status(400).json({
      msg: "status not found",
    });
  }
  await assignment
    .updateOne({ _id: req.params.assignmentId }, { status: req.body.status })
    .populate("project_id")
    .populate("user_id")
    .then((result) => {
      return res.status(200).json({
        result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({
        msg: "unexpected error",
      });
    });
};
export const deleteAssignment = (req, res) => {};
