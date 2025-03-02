import React, { useState } from "react";
import PropTypes from "prop-types";

const CreateTeams = ({ persons }) => {
  const [teams, setTeams] = useState([]);
  const [showFiligranas, setShowFiligranas] = useState(true);

  const toggleFiligranas = () => {
    setShowFiligranas((prev) => !prev);
  };

  // NO SE USA :VV
  const classifyByFiligranas = (person) => {
    const filigranasCount = person.personFiligranas.length;
    if (filigranasCount <= 2) return "malo";
    if (filigranasCount === 3) return "medio";
    if (filigranasCount === 4) return "bueno";
    if (filigranasCount === 5) return "muy bueno";
  };

  // Función para mezclar aleatoriamente un array
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const createBalancedTeams = () => {
    const shuffledPersons = shuffleArray(persons);

    const sortedPersons = [...shuffledPersons].sort((a, b) => {
      return b.personFiligranas.length - a.personFiligranas.length;
    });

    const teamA = [];
    const teamB = [];
    let teamAFiligranas = 0;
    let teamBFiligranas = 0;

    sortedPersons.forEach((person) => {
      const filigranasCount = person.personFiligranas.length;

      if (teamAFiligranas <= teamBFiligranas) {
        teamA.push(person);
        teamAFiligranas += filigranasCount;
      } else {
        teamB.push(person);
        teamBFiligranas += filigranasCount;
      }
    });

    setTeams([teamA, teamB]);
  };

  const resetTeamsHandler = () => {
    setTeams([]);
  };

  return (
    <div className="mt-6 px-4">
      <div className="flex flex-col items-center mt-6">
        {persons.length === 8 || persons.length === 10 ? (
          <div className="flex justify-center items-center">
            <div className="relative inline-flex group">
              <div className="absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#48915e] via-[#198539] to-[#086e27] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
              <button
                className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-[#094111] font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                onClick={createBalancedTeams}
              >
                Armar Equipos
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-center">
            Se necesitan exactamente 8 o 10 personas para formar equipos.
          </p>
        )}
      </div>

      {teams.length > 0 && (
        <div className="flex flex-col items-center mt-6">
          <div className="flex flex-wrap justify-center gap-4">
            <button
              className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-[#094111] font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
              onClick={createBalancedTeams}
            >
              Rehacer Equipos
            </button>
            <button
              className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-[#ff0000] font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
              onClick={resetTeamsHandler}
            >
              Reiniciar
            </button>
          </div>

          {/* TABLA DE EQUIPOS */}

          <div className="flex flex-col items-center mt-10">
            <button
              onClick={toggleFiligranas}
              className="mb-6 px-4 py-2 bg-[#094111] text-xl font-bold text-white rounded-lg shadow hover:bg-green-800 transition"
            >
              {showFiligranas ? "Ocultar Skills 😭 " : "Mostrar Skills 😎"}
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
              {teams.map((team, index) => (
                <div
                  key={index}
                  className="mx-auto w-full max-w-md rgb(206, 206, 206) p-4 rounded-lg shadow-lg"
                >
                  <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
                    Equipo {index + 1}
                  </h2>

                  <table className="w-full text-black border border-gray-700 rounded-lg overflow-hidden shadow-md text-lg">
                    <thead className="bg-[#386e40] text-white">
                      <tr>
                        <th className="px-4 py-3 border border-black">
                          Nombre
                        </th>
                        <th className="px-4 py-3 border border-black">
                          Skills
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-[#9a9e9b]">
                      {team.map((member) => (
                        <tr key={member.id} className="border-b">
                          <td className="px-4 py-3 text-center border border-black">
                            {member.personName}
                          </td>
                          <td className="px-4 py-3 text-center text-xl text-gray-700 border border-black">
                            {showFiligranas
                              ? member.personFiligranas.join("")
                              : "😛"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateTeams;
