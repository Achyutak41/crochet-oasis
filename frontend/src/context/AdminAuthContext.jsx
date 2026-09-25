import {
  createContext,
  useContext,
  useState,
} from "react";

const AdminAuthContext = createContext();

export function AdminAuthProvider({ children }) {

  const [admin, setAdmin] = useState(() => {

    const savedAdmin =
      localStorage.getItem("crochetOasisAdmin");

    return savedAdmin
      ? JSON.parse(savedAdmin)
      : null;
  });


  const login = (email, password) => {

    // Temporary frontend credentials.
    // This will be replaced by Flask authentication later.

    if (
      email === "admin@crochetoasis.com" &&
      password === "admin123"
    ) {

      const adminData = {
        name: "Crochet Oasis Admin",
        email,
      };

      setAdmin(adminData);

      localStorage.setItem(
        "crochetOasisAdmin",
        JSON.stringify(adminData)
      );

      return {
        success: true,
      };
    }


    return {
      success: false,
      message: "Invalid admin email or password.",
    };
  };


  const logout = () => {

    setAdmin(null);

    localStorage.removeItem(
      "crochetOasisAdmin"
    );
  };


  const isAdminAuthenticated =
    admin !== null;


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