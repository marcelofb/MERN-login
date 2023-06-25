import { useForm } from "react-hook-form";
import { UseTasks } from "../context/TasksContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

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
        setValue("date", dayjs.utc(task.date).format("YYYY-MM-DD"));
      };
      loadTask();
    }
  }, []);

  const onSubmit = handleSubmit(async (values) => {
    const dataValid = {
      ...values,
      date: values.date
        ? dayjs.utc(values.date).format()
        : dayjs.utc().format(),
    };
    if (params.id) {
      await updateTask(params.id, dataValid);
    } else {
      await createTask(dataValid);
    }
    navigate("/tasks");
  });
  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <form onSubmit={onSubmit}>
          <label htmlFor="title">title</label>
          <input
            {...register("title")}
            type="text"
            placeholder="Title"
            autoFocus
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          />
          <label htmlFor="description">description</label>
          <textarea
            {...register("description")}
            rows="3"
            placeholder="Description"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          ></textarea>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            {...register("date")}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          />
          <button className="bg-indigo-500 px-3 py-2 rounded-md">Save</button>
        </form>
      </div>
    </div>
  );
}

export default TaskFormPage;
