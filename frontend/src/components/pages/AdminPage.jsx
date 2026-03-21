import React, { useEffect, useState } from "react";
import {
  getUsersRequest,
  updateUserRoleRequest,
} from "../../services/userService";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    try {
      const data = await getUsersRequest();
      setUsers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const changeRole = async (id, role) => {
    try {
      await updateUserRoleRequest(id, role);
      loadUsers();
    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.message || "Error al actualizar rol");
    }
  };

  return (
    <div className="px-4 py-10">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/70 shadow-2xl backdrop-blur">
        <div className="border-b border-white/10 bg-gradient-to-r from-emerald-900/40 via-zinc-950 to-lime-700/20 px-6 py-6 sm:px-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-emerald-400">
            Gestión del sistema
          </p>
          <h1 className="text-3xl font-black text-white sm:text-4xl">
            Panel de administración
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400">
            Desde acá podés ver usuarios y actualizar roles según permisos.
          </p>
        </div>

        <div className="px-6 py-8 sm:px-8">
          {loading ? (
            <p className="text-center text-zinc-400">Cargando usuarios...</p>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/70">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px]">
                  <thead className="bg-zinc-950/80">
                    <tr className="text-left text-sm uppercase tracking-wider text-zinc-300">
                      <th className="px-4 py-4">Nombre</th>
                      <th className="px-4 py-4">Email</th>
                      <th className="px-4 py-4">Rol actual</th>
                      <th className="px-4 py-4">Cambiar rol</th>
                    </tr>
                  </thead>

                  <tbody>
                    {users.map((user) => (
                      <tr
                        key={user.id}
                        className="border-t border-white/10 bg-zinc-900/60 transition hover:bg-zinc-800/80"
                      >
                        <td className="px-4 py-4 font-semibold text-white">
                          {user.name}
                        </td>
                        <td className="px-4 py-4 text-zinc-300">
                          {user.email}
                        </td>
                        <td className="px-4 py-4">
                          <span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-300">
                            {user.role}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <select
                            defaultValue={user.role}
                            onChange={(e) =>
                              changeRole(user.id, e.target.value)
                            }
                            className="rounded-xl border border-white/10 bg-zinc-950 px-3 py-2 text-white outline-none"
                          >
                            <option value="USER">USER</option>
                            <option value="ADMIN">ADMIN</option>
                            <option value="SYSADMIN">SYSADMIN</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
