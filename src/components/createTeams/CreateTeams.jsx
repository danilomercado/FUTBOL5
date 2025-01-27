import React, { useState } from "react";

const CreateTeams = ({ persons }) => {
  const [teams, setTeams] = useState([]);

  const classifyByFiligranas = (person) => {
    const filigranasCount = person.personFiligranas.length;
    if (filigranasCount === 1) return "muy malo";
    if (filigranasCount === 2) return "malo";
    if (filigranasCount === 3) return "medio";
    if (filigranasCount === 4) return "bueno";
    if (filigranasCount === 5) return "muy bueno";
  };

  const createTeamsHandler = () => {
    const sortedPerons = [...persons].sort((a, b) => {
      return b.personFiligranas.length - a.personFiligranas.length;
    });

    const teamA = [];
    const teamB = [];

    sortedPerons.forEach((person, index) => {
      if (index % 2 === 0) {
        teamA.push(person);
      } else {
        teamB.push(person);
      }
    });

    setTeams([teamA, teamB]);
  };

  return (
    <>
      <div className="mt-6">
        {persons.length === 8 || persons.length === 10 ? (
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
            onClick={createTeamsHandler}
          >
            {" "}
            Armar Equipos
          </button>
        ) : (
          <p className="text-gray-500">
            Se necesitan exactamente 8 o 10 personas para armar los equipos
          </p>
        )}

        {teams.length > 0 && (
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
                      {/* <span className="text-sm text-gray-500">
                        ({classifyByFiligranas(member)})
                      </span> */}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default CreateTeams;
