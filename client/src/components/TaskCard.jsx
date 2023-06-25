import { UseTasks } from "../context/TasksContext";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

function TaskCard({ task }) {
  const { deleteTask } = UseTasks();
  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">{task.title}</h1>
        <div className="flex gap-x-2 items-center">
          <button
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
            onClick={async () => {
              await deleteTask(task._id);
            }}
          >
            delete
          </button>
          <Link
            to={`/tasks/${task._id}`}
            className="
          bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
          >
            edit
          </Link>
        </div>
      </header>
      <p className="text-slate-300">{task.description}</p>
      <p>{dayjs.utc(task.date).format("DD/MM/YYYY")}</p>
    </div>
  );
}

export default TaskCard;
