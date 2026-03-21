import React, { createContext, useContext, useEffect, useState } from "react";
import {
  loginRequest,
  meRequest,
  registerRequest,
} from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const loadUser = async () => {
    try {
      const userData = await meRequest();
      setUser(userData);
    } catch {
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      loadUser();
    } else {
      setAuthLoading(false);
    }
  }, []);

  // 🔥 LOGIN DEFINITIVO
  const login = async (data) => {
    const result = await loginRequest(data);

    // 🔴 CLAVE: pisar token SIEMPRE
    localStorage.setItem("token", result.token);

    // 🔴 CLAVE: recargar app → evita token viejo en memoria
    window.location.href = "/";
  };

  const register = async (data) => {
    const result = await registerRequest(data);

    localStorage.setItem("token", result.token);

    window.location.href = "/";
  };

  // 🔥 LOGOUT REAL
  const logout = () => {
    localStorage.removeItem("token");

    // 🔴 CLAVE: limpiar todo estado
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
