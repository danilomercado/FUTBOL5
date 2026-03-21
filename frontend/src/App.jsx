import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";

import ProtectedRoute from "./components/auth/ProtectedRoute";
import Navbar from "./components/navbar/Navbar";
import { AuthProvider, useAuth } from "./context/AuthContext";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import AdminPage from "./components/pages/AdminPage";

// =========================
// ROUTES (CONTROL GLOBAL)
// =========================
function AppRoutes() {
  const { authLoading } = useAuth();

  // ⛔ evita flicker en TODA la app
  if (authLoading) return null;

  return (
    <Routes>
      {/* Públicas */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protegidas */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Dashboard />} />
      </Route>

      {/* Admin */}
      <Route element={<ProtectedRoute roles={["ADMIN", "SYSADMIN"]} />}>
        <Route path="/admin" element={<AdminPage />} />
      </Route>
    </Routes>
  );
}

// =========================
// APP CONTENT
// =========================
function AppContent() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.16),_transparent_22%),linear-gradient(180deg,_#020617_0%,_#09090b_45%,_#020617_100%)] text-white">
        <Navbar />
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}

// =========================
// ROOT
// =========================
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
