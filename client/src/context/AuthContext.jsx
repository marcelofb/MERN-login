import { createContext, useContext, useState } from "react";
import { registerRequest } from "../api/auth";

export const AuthContext = createContext();

export const UseAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      console.log(res.data);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      setErrors(error.response.data.errors);
    }
  };
  return (
    <AuthContext.Provider value={{ user, signup, isAuthenticated, errors }}>
      {children}
    </AuthContext.Provider>
  );
};
