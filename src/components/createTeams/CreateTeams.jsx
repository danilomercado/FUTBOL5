import React, { useState } from "react";
import PropTypes from "prop-types";

const CreateTeams = ({ persons }) => {
  const [teams, setTeams] = useState([]);

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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
            {teams.map((team, index) => (
              <div
                key={index}
                className="mx-auto w-full max-w-md border-2 border-black bg-[#91b39b] p-4 rounded-lg shadow"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-center">
                  Equipo {index + 1}
                </h2>
                <ul className="mt-4 space-y-2">
                  {team.map((member) => (
                    <li
                      key={member.id}
                      className="flex justify-between items-center"
                    >
                      <span>{member.personName}</span>
                      <span className="text-lg md:text-xl text-gray-500">
                        {member.personFiligranas.join("")}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateTeams;
