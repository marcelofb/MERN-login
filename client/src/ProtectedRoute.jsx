import { UseAuth } from "./context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const { isAuthenticated, loading } = UseAuth();
  if (loading) return <h1>Cargando...</h1>;
  if (!isAuthenticated && !loading) return <Navigate to="/login" />;
  return <Outlet />;
}

export default ProtectedRoute;
