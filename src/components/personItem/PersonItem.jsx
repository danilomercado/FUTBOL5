import React from "react";
import PropTypes from "prop-types";

const PersonItem = ({ id, name, filigranas, opinion, onShowModal }) => {
  const handleDeleteClick = () => {
    onShowModal(id);
  };

  return (
    <tr className="border-b border-white/10 bg-zinc-900/70 transition hover:bg-zinc-800/80">
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-500/10 text-sm font-bold text-emerald-300">
            {name?.charAt(0)?.toUpperCase() || "J"}
          </div>
          <div>
            <p className="font-semibold text-white">{name}</p>
            {opinion && <p className="text-xs text-zinc-400">{opinion}</p>}
          </div>
        </div>
      </td>

      <td className="px-4 py-4">
        <div className="flex flex-wrap gap-1 text-lg">
          {filigranas.map((star, index) => (
            <span key={index}>{star}</span>
          ))}
        </div>
      </td>

      <td className="px-4 py-4 text-center">
        <button
          onClick={handleDeleteClick}
          className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-300 transition hover:bg-red-500 hover:text-white"
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
  onShowModal: PropTypes.func.isRequired,
};
