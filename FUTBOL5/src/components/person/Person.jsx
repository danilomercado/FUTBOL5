import React, { useState } from "react";
import PersonItem from "../personItem/PersonItem";
import DeleteModal from "../ui/deleteModal/DeleteModal";

const Person = ({ persons, onDelete }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [personIdToDelete, setPersonIdToDelete] = useState(null);

  const showModalHandler = (id) => {
    setShowDeleteModal(true);
    setPersonIdToDelete(id);
  };

  const hideModalHandler = () => {
    setShowDeleteModal(false);
    setPersonIdToDelete(null);
  };

  const deletePersonHandler = () => {
    if (personIdToDelete !== null) {
      onDelete(personIdToDelete);
      hideModalHandler();
    }
  };

  return (
    <>
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={hideModalHandler}
        onConfirm={deletePersonHandler}
      />

      <div className="mx-auto mt-6 w-full max-w-5xl px-4">
        {persons.length > 0 ? (
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/70 shadow-2xl backdrop-blur">
            <div className="border-b border-white/10 bg-gradient-to-r from-emerald-700/30 to-lime-500/10 px-5 py-4">
              <h3 className="text-lg font-bold text-white">Plantel cargado</h3>
              <p className="text-sm text-zinc-300">
                Administrá tus jugadores antes de sortear los equipos.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead className="bg-zinc-900/90">
                  <tr className="text-left text-sm uppercase tracking-wider text-zinc-300">
                    <th className="px-4 py-4">Jugador</th>
                    <th className="px-4 py-4">Skills</th>
                    <th className="px-4 py-4 text-center">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {persons.map((person) => (
                    <PersonItem
                      key={person.id}
                      id={person.id}
                      name={person.personName}
                      filigranas={person.personFiligranas}
                      opinion={person.personOpinion}
                      onShowModal={showModalHandler}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-white/10 bg-zinc-900/50 px-6 py-12 text-center shadow-xl">
            <p className="text-lg font-semibold text-white">
              Todavía no cargaste jugadores
            </p>
            <p className="mt-2 text-sm text-zinc-400">
              Agregá algunos nombres para empezar a armar el equipo.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Person;
