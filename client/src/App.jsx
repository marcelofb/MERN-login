import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import {
  HomePage,
  LoginPage,
  RegisterPage,
  TasksPage,
  TaskFormPage,
  ProfilePage,
} from "./pages";
import ProtectedRoute from "./ProtectedRoute";
import { TasksProvider } from "./context/TasksContext";
import Navbar from "./components/navbar";

function App() {
  return (
    <AuthProvider>
      <TasksProvider>
        <BrowserRouter>
          <main className="container mx-auto px-10">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/tasks" element={<TasksPage />} />
                <Route path="/add-task" element={<TaskFormPage />} />
                <Route path="/tasks/:id" element={<TaskFormPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Route>
            </Routes>
          </main>
        </BrowserRouter>
      </TasksProvider>
    </AuthProvider>
  );
}

export default App;
