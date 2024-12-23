import Score from "../models/scoreSchema.js";

//give score to a user for a project
export const createScore = async (req, res) => {
  const { user_id, project_id, score } = req.body;
  if (!user_id || !project_id || !score) {
    return res.status(400).json({
      msg: "all fields are required",
    });
  }
  await Score.create({ user_id, project_id, score })
    .populate("project_id")
    .populate("user_id")
    .then((score) => {
      return res.status(201).json({
        score,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({
        msg: "unexpected error",
      });
    });
};

//get Userscores of different projects
export const getUserScore = async (req, res) => {
  if (!req.params.userId) {
    return res.status(400).json({
      msg: "userId are required",
    });
  }
  await Score.find({ user_id: req.params.userId })
    .populate("project_id")
    .populate("user_id")
    .then((scores) => {
      return res.status(200).json({
        scores,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({
        msg: "unexpected error",
      });
    });
};

//get scores of students of a project
export const getProjectScore = async (req, res) => {
  if (!req.params.projectId) {
    return res.status(400).json({
      msg: "projectId are required",
    });
  }
  await Score.find({ project_id: req.params.projectId })
    .populate("project_id")
    .populate("user_id")
    .then((scores) => {
      return res.status(200).json({
        scores,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({
        msg: "unexpected error",
      });
    });
};
