import { createContext, useContext, useState } from "react";
import {
  createTaskRequest,
  deleteTaskRequest,
  getTasksRequest,
} from "../api/tasks";

export const TasksContext = createContext();

export const UseTasks = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
};

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    try {
      const res = await getTasksRequest();
      setTasks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createTask = async (task) => {
    const res = await createTaskRequest(task);
    console.log(res);
    //setTasks([...tasks, task]);
  };

  const deleteTask = async (id) => {
    try {
      const res = await deleteTaskRequest(id);
      if (res.status === 204) setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <TasksContext.Provider value={{ tasks, createTask, getTasks, deleteTask }}>
      {children}
    </TasksContext.Provider>
  );
};
