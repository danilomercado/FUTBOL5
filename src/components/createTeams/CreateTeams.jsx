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

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i -= 1) {
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
    setShowFiligranas(true);
  };

  const getTeamScore = (team) => {
    return team.reduce(
      (acc, player) => acc + player.personFiligranas.length,
      0,
    );
  };

  return (
    <section className="mt-12 px-4">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/70 shadow-2xl backdrop-blur">
        <div className="border-b border-white/10 bg-gradient-to-r from-emerald-900/40 via-zinc-950 to-lime-700/20 px-6 py-6 sm:px-8">
          <div className="text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-emerald-400">
              Modo partido
            </p>
            <h2 className="text-3xl font-black text-white sm:text-4xl">
              Crear equipos balanceados
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-zinc-400">
              El sistema reparte jugadores intentando equilibrar la suma total
              de skills entre ambos equipos.
            </p>
          </div>
        </div>

        <div className="px-6 py-8 sm:px-8">
          <div className="flex flex-col items-center">
            {persons.length === 8 || persons.length === 10 ? (
              <button
                onClick={createBalancedTeams}
                className="rounded-2xl bg-gradient-to-r from-emerald-500 to-lime-400 px-8 py-4 text-lg font-black text-zinc-950 shadow-lg transition hover:scale-[1.02]"
              >
                Armar Equipos
              </button>
            ) : (
              <div className="w-full max-w-2xl rounded-2xl border border-amber-500/20 bg-amber-500/10 px-5 py-4 text-center">
                <p className="font-semibold text-amber-300">
                  Se necesitan exactamente 8 o 10 personas para formar equipos.
                </p>
                <p className="mt-1 text-sm text-zinc-400">
                  Ahora tenés {persons.length} cargadas.
                </p>
              </div>
            )}
          </div>

          {teams.length > 0 && (
            <div className="mt-10">
              <div className="flex flex-col items-center gap-4">
                <div className="flex flex-wrap justify-center gap-4">
                  <button
                    className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-6 py-3 text-base font-bold text-emerald-300 transition hover:bg-emerald-500 hover:text-white"
                    onClick={createBalancedTeams}
                  >
                    Rehacer Equipos
                  </button>

                  <button
                    className="rounded-2xl border border-red-500/20 bg-red-500/10 px-6 py-3 text-base font-bold text-red-300 transition hover:bg-red-500 hover:text-white"
                    onClick={resetTeamsHandler}
                  >
                    Reiniciar
                  </button>
                </div>

                <button
                  onClick={toggleFiligranas}
                  className="rounded-2xl border border-white/10 bg-zinc-900 px-6 py-3 text-base font-bold text-white transition hover:bg-zinc-800"
                >
                  {showFiligranas ? "Ocultar Skills 👀" : "Mostrar Skills ⭐"}
                </button>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
                {teams.map((team, index) => (
                  <div
                    key={index}
                    className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/70 shadow-xl"
                  >
                    <div className="border-b border-white/10 bg-gradient-to-r from-emerald-800/30 to-lime-600/10 px-6 py-5">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <h3 className="text-2xl font-black text-white">
                            Equipo {index + 1}
                          </h3>
                          <p className="mt-1 text-sm text-zinc-400">
                            {team.length} jugadores
                          </p>
                        </div>

                        <div className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-2 text-sm font-bold text-emerald-300">
                          Total: {getTeamScore(team)} ⭐
                        </div>
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[320px]">
                        <thead className="bg-zinc-950/80">
                          <tr className="text-sm uppercase tracking-wider text-zinc-300">
                            <th className="px-4 py-4 text-left">Nombre</th>
                            <th className="px-4 py-4 text-center">Skills</th>
                          </tr>
                        </thead>

                        <tbody>
                          {team.map((member) => (
                            <tr
                              key={member.id}
                              className="border-t border-white/10 bg-zinc-900/60 transition hover:bg-zinc-800/80"
                            >
                              <td className="px-4 py-4">
                                <div className="flex items-center gap-3">
                                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-500/10 text-sm font-bold text-emerald-300">
                                    {member.personName
                                      ?.charAt(0)
                                      ?.toUpperCase() || "J"}
                                  </div>
                                  <span className="font-semibold text-white">
                                    {member.personName}
                                  </span>
                                </div>
                              </td>

                              <td className="px-4 py-4 text-center text-xl">
                                {showFiligranas
                                  ? member.personFiligranas.join("")
                                  : "🤐"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

CreateTeams.propTypes = {
  persons: PropTypes.array.isRequired,
};

export default CreateTeams;
