import { useForm } from "react-hook-form";
import { UseTasks } from "../context/TasksContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

function TaskFormPage() {
  const { register, handleSubmit, setValue } = useForm();
  const { createTask, getTask, updateTask } = UseTasks();
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    if (params.id) {
      const loadTask = async () => {
        const task = await getTask(params.id);
        setValue("title", task.title);
        setValue("description", task.description);
      };
      loadTask();
    }
  }, []);

  const onSubmit = handleSubmit(async (values) => {
    if (params.id) {
      await updateTask(params.id, values);
    } else {
      await createTask(values);
    }
    navigate("/tasks");
  });
  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <form onSubmit={onSubmit}>
        <input
          {...register("title")}
          type="text"
          placeholder="Title"
          autoFocus
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
        />
        <textarea
          {...register("description")}
          rows="3"
          placeholder="Description"
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
        ></textarea>
        <button>Save</button>
      </form>
    </div>
  );
}

export default TaskFormPage;
