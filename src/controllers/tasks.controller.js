import Task from "../models/task.model.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.userId }).populate("user");
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
export const createTask = async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const savedTask = await new Task({
      title,
      description,
      date,
      user: req.userId,
    }).save();
    res.json(savedTask);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
export const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate("user");
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    res.status(404).json({ message: "Task not found" });
  }
};

export const updateTasks = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    res.status(404).json({ message: "Task not found" });
  }
};

export const deleteTasks = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.sendStatus(204);
  } catch (error) {
    res.status(404).json({ message: "Task not found" });
  }
};
