import React from "react";
import PropTypes from "prop-types";

const PersonItem = ({ id, name, filigranas, opinion, onShowModal }) => {
  const handleDeleteClick = () => {
    onShowModal(id); // Llama a la función para mostrar el modal con el ID actual
  };

  return (
    <div className="bg-white p-8 overflow-auto mt-16 h-screen">
      <div className="relative overflow-auto">
        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full bg-white border mb-20">
            <thead>
              <tr className="bg-[#2B4DC994] text-center text-xs md:text-sm font-thin text-white">
                <th className="p-0">
                  <span className="block py-2 px-3 border-r border-gray-300">
                    Nombre
                  </span>
                </th>
                <th className="p-0">
                  <span className="block py-2 px-3 border-r border-gray-300">
                    Filigranas
                  </span>
                </th>
                <th className="p-4 text-xs md:text-sm">Opinion</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b text-xs md:text-sm text-center text-gray-800">
                <td className="p-2 md:p-4">{name}</td>
                <td className="p-2 md:p-4">{filigranas}</td>
                <td className="p-2 md:p-4">{opinion}</td>
                <td className="relative p-2 md:p-4 flex justify-center space-x-2">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded-md text-xs md:text-sm"
                    onClick={handleDeleteClick}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    // <div classNameName="flex flex-wrap justify-center gap-4 p-4">
    //   <div classNameName="flex justify-center items-center border h-32 w-48 bg-blue-100">
    //     <h1>{name}</h1>
    //     <h2>{filigranas}</h2>
    //     <p>{opinion}</p>
    //     <button onClick={handleDeleteClick}>Borrar</button>
    //   </div>
    // </div>
    // <a
    //   classNameNameName="relative bg-gray-900 block p-6 border border-gray-100 rounded-lg max-w-sm mx-auto mt-24"
    //   href="#"
    // >
    //   <span classNameNameName="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

    //   <div classNameNameName="my-4">
    //     <h2 classNameNameName="text-white text-2xl font-bold pb-2">{name}</h2>
    //     <p classNameNameName="text-gray-300 py-1">{filigranas}</p>
    //     <p classNameNameName="text-gray-300 py-1">{opinion}</p>
    //   </div>

    //   <div classNameNameName="flex justify-end">
    //     <button
    //       onClick={handleDeleteClick} // Maneja el clic del botón "Borrar"
    //       classNameNameName="px-2 py-1 text-white border border-gray-200 font-semibold rounded hover:bg-gray-800"
    //     >
    //       Borrar
    //     </button>
    //   </div>
    // </a>
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
