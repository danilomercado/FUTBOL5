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
    // Mezclar personas antes de equilibrar
    const shuffledPersons = shuffleArray(persons);

    // Ordena por filigranas después de mezclar
    const sortedPersons = [...shuffledPersons].sort((a, b) => {
      return b.personFiligranas.length - a.personFiligranas.length;
    });

    // Inicializa los equipos y sus sumas de filigranas
    const teamA = [];
    const teamB = [];
    let teamAFiligranas = 0;
    let teamBFiligranas = 0;

    // Asigna las personas a los equipos de manera equilibrada
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
    setTeams([]); // Reinicia los equipos
  };

  return (
    <div className="mt-6">
      <div className="flex flex-col items-center mt-6">
        {persons.length === 8 || persons.length === 10 ? (
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 mr-4"
            onClick={createBalancedTeams}
          >
            Crear Equipos
          </button>
        ) : (
          <p className="text-gray-500">
            Se necesitan exactamente 8 o 10 personas para formar equipos.
          </p>
        )}
      </div>

      {teams.length > 0 && (
        <div className="flex flex-col items-center mt-6">
          <div className="flex gap-4">
            <button
              className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
              onClick={createBalancedTeams}
            >
              Rehacer Equipos
            </button>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700"
              onClick={resetTeamsHandler}
            >
              Reiniciar
            </button>
          </div>

          <div className="flex justify-center mt-6 gap-10">
            {teams.map((team, index) => (
              <div
                key={index}
                className="bg-gray-100 p-4 rounded-lg shadow w-1/2"
              >
                <h2 className="text-xl font-bold text-center">
                  Equipo {index + 1}
                </h2>
                <ul className="mt-4 space-y-2">
                  {team.map((member) => (
                    <li
                      key={member.id}
                      className="flex justify-between items-center"
                    >
                      <span>{member.personName}</span>
                      <span className="text-sm text-gray-500">
                        ({classifyByFiligranas(member)})
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

// CreateTeams.propTypes = {
//   persons: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       personName: PropTypes.string.isRequired,
//       personFiligranas: PropTypes.array.isRequired,
//       personOpinion: PropTypes.string,
//     })
//   ).isRequired,
// };

export default CreateTeams;
