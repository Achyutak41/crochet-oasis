import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("crochetOasisUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (userData) => {
    console.log("LOGIN USER:", userData);

    setUser(userData);
    localStorage.setItem(
      "crochetOasisUser",
      JSON.stringify(userData)
    );
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("crochetOasisUser");
  };

  const isAuthenticated = user !== null;

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}