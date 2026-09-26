import { createContext, useContext, useState } from "react";
import axios from "axios";

const AdminAuthContext = createContext();

const API_URL = import.meta.env.VITE_API_URL;

export function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(() => {
    const savedAdmin = localStorage.getItem("crochetOasisAdmin");

    return savedAdmin
      ? JSON.parse(savedAdmin)
      : null;
  });

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        `${API_URL}/auth/admin-login`,
        {
          email: email.trim(),
          password,
        }
      );

      const adminData = response.data.user;
      const accessToken = response.data.access_token;

      // Save admin user
      setAdmin(adminData);

      localStorage.setItem(
        "crochetOasisAdmin",
        JSON.stringify(adminData)
      );

      // Save JWT token
      localStorage.setItem(
        "crochetOasisAdminToken",
        accessToken
      );

      return {
        success: true,
        user: adminData,
      };
    } catch (error) {
      console.error(
        "Admin login failed:",
        error.response?.data || error
      );

      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Unable to login as admin.",
      };
    }
  };

  const logout = () => {
    setAdmin(null);

    localStorage.removeItem(
      "crochetOasisAdmin"
    );

    localStorage.removeItem(
      "crochetOasisAdminToken"
    );
  };

  const isAdminAuthenticated = admin !== null;

  return (
    <AdminAuthContext.Provider
      value={{
        admin,
        login,
        logout,
        isAdminAuthenticated,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  return useContext(AdminAuthContext);
}