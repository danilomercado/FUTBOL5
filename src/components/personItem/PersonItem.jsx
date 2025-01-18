import React from "react";
import PropTypes from "prop-types";

const PersonItem = ({ id, name, filigranas, opinion, onShowModal }) => {
  const handleDeleteClick = () => {
    onShowModal(id); // Llama a la función para mostrar el modal con el ID actual
  };

  return (
    <div className="mx-auto mt-11 w-80 transform overflow-hidden rounded-lg">
      <div className="flex flex-row items-center justify-between p-4">
        <h1>{name}</h1>
        <h2>{filigranas}</h2>
        <button
          className="text-red-500 hover:underline"
          onClick={handleDeleteClick}
        >
          Borrar
        </button>
      </div>
    </div>
  );
};

export default PersonItem;

PersonItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  filigranas: PropTypes.array.isRequired,
  opinion: PropTypes.string,
  onShowModal: PropTypes.func.isRequired, // Prop para manejar el modal
};
