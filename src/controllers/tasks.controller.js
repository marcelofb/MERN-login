import Task from "../models/task.model.js";

export const getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.userId }).populate("user");
  res.json(tasks);
};
export const createTask = async (req, res) => {
  const { title, description, date } = req.body;
  const savedTask = await new Task({
    title,
    description,
    date,
    user: req.userId,
  }).save();
  res.json(savedTask);
};
export const getTask = async (req, res) => {
  const task = await Task.findById(req.params.id).populate("user");
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json(task);
};

export const updateTasks = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json(task);
};

export const deleteTasks = async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.sendStatus(204);
};
