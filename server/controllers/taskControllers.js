import Task from "../models/tasksSchema.js";

//get list of tasks in a project
export const getTasks = async (req, res) => {
  if (!req.params.projectId) {
    return res.status(400).json({
      msg: "projectId is required",
    });
  }
  await Task.find({ project_id: req.params.projectId })
    .populate(" project_id")
    .then((tasks) => {
      return res.status(200).json({
        tasks,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({
        msg: "unexpected error",
      });
    });
};

//create  a task
export const createTasks = async (req, res) => {
  const { project_id, task_name, due_date, status, description } = req.body;
  if (!project_id || !task_name || !due_date || !status) {
    return res.status(400).json({
      msg: "all fields and required",
    });
  }
  await Task.create({ project_id, task_name, due_date, status, description })
    .populate(" project_id")
    .then((task) => {
      return res.status(200).json({
        task,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({
        msg: "unexpected error",
      });
    });
};

//get deatails of a task
export const getTaskDetail = async (req, res) => {
  if (!req.params.taskId) {
    return res.status(400).json({
      msg: "taskId is required",
    });
  }
  await Task.findOne({ _id: req.params.taskId })
    .populate(" project_id")
    .then((task) => {
      return res.status(200).json({
        task,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({
        msg: "unexpected error",
      });
    });
};
export const updateTask = (req, res) => {};
export const deleteTask = (req, res) => {};
