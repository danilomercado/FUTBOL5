import React from "react";

const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
  const deletePersonHandler = () => {
    onConfirm();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl">
        <div className="border-b border-white/10 bg-gradient-to-r from-red-900/50 to-zinc-900 px-6 py-5">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-red-400/30 bg-red-500/10 text-2xl text-red-400">
              ⚠
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Eliminar jugador</h3>
              <p className="text-sm text-zinc-300">
                Esta acción lo saca de la lista actual.
              </p>
            </div>
          </div>
        </div>

        <div className="px-6 py-5">
          <p className="text-sm leading-6 text-zinc-300">
            ¿Seguro que querés borrar este jugador? No afecta la lógica del
            equipo, pero sí desaparece de la lista guardada.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              onClick={onClose}
              className="rounded-xl border border-white/10 bg-zinc-800 px-5 py-3 text-sm font-semibold text-zinc-200 transition hover:bg-zinc-700"
            >
              Cancelar
            </button>
            <button
              onClick={deletePersonHandler}
              className="rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-500"
            >
              Sí, borrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
