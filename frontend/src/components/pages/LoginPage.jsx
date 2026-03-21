import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const changeHandler = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(form);
      navigate("/");
    } catch (error) {
      setError(error?.response?.data?.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-81px)] items-center justify-center px-4 py-10">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/50 shadow-2xl backdrop-blur lg:grid-cols-2">
        <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-emerald-900 via-emerald-800 to-lime-700 p-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-100/80">
              Bienvenido a ArmaF5
            </p>
            <h1 className="mt-4 text-4xl font-black leading-tight text-white">
              Entrá y armá equipos de fútbol balanceados
            </h1>
            <p className="mt-5 max-w-md text-sm leading-6 text-emerald-50/90">
              Guardá tus jugadores en tu cuenta, administrá equipos y mantené
              todo persistido por usuario.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
            <p className="text-sm text-white/90">
              Iniciá sesión para acceder a tu dashboard y gestionar jugadores.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center p-6 sm:p-10">
          <form
            onSubmit={submitHandler}
            className="w-full max-w-md rounded-3xl border border-white/10 bg-zinc-900/80 p-8 shadow-xl"
          >
            <div className="mb-8 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
                Acceso
              </p>
              <h2 className="mt-2 text-4xl font-black text-white">
                Iniciar sesión
              </h2>
              <p className="mt-3 text-sm text-zinc-400">
                Ingresá con tu cuenta para continuar.
              </p>
            </div>

            <div className="mt-4">
              <label className="mb-2 block text-sm font-bold text-zinc-200">
                Email
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={changeHandler}
                placeholder="tuemail@email.com"
                className="w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div className="mt-4">
              <label className="mb-2 block text-sm font-bold text-zinc-200">
                Contraseña
              </label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={changeHandler}
                placeholder="••••••••"
                className="w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            {error && (
              <p className="mt-4 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {error}
              </p>
            )}

            <button className="mt-6 w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-lime-400 px-6 py-3 font-black text-zinc-950 transition hover:scale-[1.01]">
              Entrar
            </button>

            <p className="mt-5 text-center text-sm text-zinc-400">
              ¿No tenés cuenta?{" "}
              <Link
                to="/register"
                className="font-semibold text-emerald-400 transition hover:text-emerald-300"
              >
                Registrate
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
