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
      key={person.id} // Asigna una clave única
      id={person.id} // Pasa el ID al componente PersonItem
      name={person.personName} // Pasa el nombre
      filigranas={person.personFiligranas} // Pasa las filigranas
      opinion={person.personOpinion} // Pasa la opinión
      onShowModal={showModalHandler} // Función para mostrar el modal
    />
  ));

  return (
    <>
      <DeleteModal
        isOpen={showDeleteModal} // Controla la visibilidad del modal
        onClose={hideModalHandler} // Función para cerrar el modal
        onConfirm={deletePersonHandler} // Llama a la función de eliminación
      />

      <div className="mt-4 gap-4 flex-wrap">
        {personMapped.length > 0 ? (
          personMapped
        ) : (
          <p className="text-gray-500">No se encontraron personas cargadas</p> // Mensaje alternativo
        )}
      </div>
    </>
  );
};

export default Person;
