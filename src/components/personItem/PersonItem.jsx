import React from "react";
import PropTypes from "prop-types";

const PersonItem = ({ id, name, filigranas, opinion, onShowModal }) => {
  const handleDeleteClick = () => {
    onShowModal(id); // Llama a la función para mostrar el modal con el ID actual
  };

  return (
    <div className="mx-auto mt-11 w-full max-w-xs sm:w-80 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-end px-4 pt-4">
        <div
          id="dropdown"
          className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
        ></div>
      </div>
      <div className="flex flex-col items-center pb-10">
        <h1 className="mb-1 text-lg sm:text-2xl font-bold text-gray-900">
          {name}
        </h1>
        <span className="text-sm sm:text-lg text-gray-500 dark:text-gray-400">
          {filigranas}
        </span>
        <div className="flex mt-4 md:mt-6">
          <button
            className="text-red-500 hover:underline"
            onClick={handleDeleteClick}
          >
            Borrar
          </button>
        </div>
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
