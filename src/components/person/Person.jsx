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

  //
  const personMapped = persons.map((person) => (
    <PersonItem
      key={person.id}
      id={person.id}
      name={person.personName}
      filigranas={person.personFiligranas}
      opinion={person.personOpinion}
      onShowModal={showModalHandler}
    />
  ));

  return (
    <>
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={hideModalHandler}
        onConfirm={deletePersonHandler}
      />

      <div className="flex flex-wrap gap-5 mt-4 justify-center">
        {personMapped.length > 0 ? (
          personMapped
        ) : (
          <p>No se encontraron personas cargadas</p> // Mensaje alternativo
        )}
      </div>
    </>
  );
};

export default Person;
