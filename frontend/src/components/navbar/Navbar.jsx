import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const navLinkBase = "rounded-xl px-4 py-2 text-sm font-semibold transition";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link
          to={isAuthenticated ? "/" : "/login"}
          className="text-2xl font-black tracking-tight text-emerald-400 transition hover:text-emerald-300"
        >
          ArmaF5
        </Link>

        <nav className="flex items-center gap-3">
          {!isAuthenticated ? (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `${navLinkBase} ${
                    isActive
                      ? "border border-emerald-400/30 bg-emerald-500/10 text-emerald-300"
                      : "border border-white/10 bg-white/5 text-zinc-200 hover:border-emerald-400/30 hover:bg-emerald-500/10 hover:text-emerald-300"
                  }`
                }
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `${navLinkBase} ${
                    isActive
                      ? "bg-gradient-to-r from-emerald-500 to-lime-400 text-zinc-950"
                      : "bg-gradient-to-r from-emerald-500 to-lime-400 text-zinc-950 hover:scale-[1.02]"
                  }`
                }
              >
                Registro
              </NavLink>
            </>
          ) : (
            <>
              {!isAuthPage && (
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `${navLinkBase} ${
                      isActive
                        ? "border border-emerald-400/30 bg-emerald-500/10 text-emerald-300"
                        : "border border-white/10 bg-white/5 text-zinc-200 hover:border-emerald-400/30 hover:bg-emerald-500/10 hover:text-emerald-300"
                    }`
                  }
                >
                  Dashboard
                </NavLink>
              )}

              {(user?.role === "ADMIN" || user?.role === "SYSADMIN") && (
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    `${navLinkBase} ${
                      isActive
                        ? "border border-emerald-400/30 bg-emerald-500/10 text-emerald-300"
                        : "border border-white/10 bg-white/5 text-zinc-200 hover:border-emerald-400/30 hover:bg-emerald-500/10 hover:text-emerald-300"
                    }`
                  }
                >
                  Admin
                </NavLink>
              )}

              <div className="hidden rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300 sm:block">
                {user?.name} ·{" "}
                <span className="font-semibold text-emerald-400">
                  {user?.role}
                </span>
              </div>

              <button
                onClick={logout}
                className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-300 transition hover:bg-red-500 hover:text-white"
              >
                Salir
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
