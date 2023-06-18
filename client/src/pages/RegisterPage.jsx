import { useForm } from "react-hook-form";
import { UseAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signup, isAuthenticated, errors: registerErrors } = UseAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit((values) => {
    signup(values);
  });
  return (
    <div className="bg-zinc-800 max-w-md p-10 rounded-md">
      {registerErrors.map((e, i) => (
        <p key={i} className="bg-red-500 p-2 text-white">
          {e}
        </p>
      ))}
      <form onSubmit={onSubmit}>
        <input
          type="text"
          {...register("username", {
            required: true,
          })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="Username"
        />
        {errors.username && (
          <p className="text-red-500">Username is required</p>
        )}
        <input
          type="email"
          {...register("email", {
            required: true,
          })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="Email"
        />
        {errors.email && <p className="text-red-500">Email is required</p>}
        <input
          type="password"
          {...register("password", {
            required: true,
          })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="Password"
        />
        {errors.password && (
          <p className="text-red-500">Password is required</p>
        )}
        <button type="submit">Register</button>
      </form>
      <p className="flex gap-x-2 justify-between">
        Already have an account?{" "}
        <Link className="text-sky-500" to={"/login"}>
          Login
        </Link>
      </p>
    </div>
  );
}

export default RegisterPage;