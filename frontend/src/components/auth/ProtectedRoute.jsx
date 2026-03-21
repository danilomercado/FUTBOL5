import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ roles = [] }) => {
  const { user, isAuthenticated, authLoading } = useAuth();

  // ⛔ Evita flicker
  if (authLoading) return null;

  // 🔒 No logueado
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 🛑 Sin permisos
  if (roles.length > 0 && !roles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  // ✅ OK
  return <Outlet />;
};

export default ProtectedRoute;
