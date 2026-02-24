import { Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import  LoginPage  from "@/pages/auth/login";
import RegisterPage from "@/pages/auth/register";
import { useController } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const {isAuth} = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/"
        element={
          isAuth ? <Index /> : <Navigate to="/login" />
        }
      />
    </Routes>
  );
}

export default App;