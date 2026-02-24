import { Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import  LoginPage  from "@/pages/auth/login";
import RegisterPage from "@/pages/auth/register";

function App() {
  const isAuthenticated = true; 

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/"
        element={
          isAuthenticated ? <Index /> : <Navigate to="/login" />
        }
      />
    </Routes>
  );
}

export default App;