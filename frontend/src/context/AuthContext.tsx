import { createContext, ReactNode, useState } from "react";

type AuthContextType = {
    isAuth: boolean,
    setIsAuth: (value: boolean) => void;
    setLogin: (value: boolean) => void;

}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuth, setIsAuth] = useState(() => {
    return localStorage.getItem("auth") === "true";
  });

  function setLogin(value: boolean) {
    setIsAuth(value);

    if (value) {
      localStorage.setItem("auth", "true");
    } else {
      localStorage.removeItem("auth");
    }
  }

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, setLogin }}>
      {children}
    </AuthContext.Provider>
  );
}