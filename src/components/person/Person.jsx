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
      <div className="flex items-center justify-center p-3 sm:p-8 mt-2">
        {persons.length > 0 ? (
          <table className="text-black w-full max-w-[700px] mx-auto border shadow-lg rounded-xl overflow-hidden text-base sm:text-lg">
            <thead className="bg-[#386e40] text-white">
              <tr>
                <th className="px-3 py-3 border border-black">NOMBRE</th>
                <th className="px-3 py-3 border border-black">SKILLS</th>
                <th className="px-3 py-3 border border-black">BORRAR</th>
              </tr>
            </thead>
            <tbody className="bg-[#9a9e9b]">
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
        ) : (
          <p className="text-center mt-4 text-gray-700 text-base sm:text-lg">
            No se encontraron personas cargadas
          </p>
        )}
      </div>
    </>
  );
};

export default Person;
