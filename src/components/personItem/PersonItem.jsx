import React from "react";
import PropTypes from "prop-types";

const PersonItem = ({ id, name, filigranas, opinion, onShowModal }) => {
  const handleDeleteClick = () => {
    onShowModal(id); // Llama a la función para mostrar el modal con el ID actual
  };

  return (
    <tr className="border ">
      <td className="text-black px-4 py-2 border border-black">{name}</td>
      <td className="px-4 py-2 border border-black">{filigranas.join(" ")}</td>
      <td className="px-4 py-2 border border-black text-center">
        <button
          onClick={handleDeleteClick}
          className="w-full sm:w-auto hover:shadow-form rounded-md bg-[#c72525] py-3 px-6 text-base font-semibold text-white outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#094111]"
        >
          Borrar
        </button>
      </td>
    </tr>
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
