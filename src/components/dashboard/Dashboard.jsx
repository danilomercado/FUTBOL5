import React, { useEffect, useState } from "react";
import NewPerson from "../newPerson/NewPerson";
import Person from "../person/Person";
import CreateTeams from "../createTeams/CreateTeams";
import Footer from "../footer/Footer";

const Dashboard = () => {
  const [personsFiltered, setPersonsFiltered] = useState([]);

  useEffect(() => {
    const personStored = JSON.parse(localStorage.getItem("persons"));
    if (Array.isArray(personStored)) {
      setPersonsFiltered(personStored);
    }
  }, []);

  const addPersonHandler = (newPerson) => {
    const personData = {
      ...newPerson,
      id: Date.now() + Math.random(),
    };

    const newPersonArray = [personData, ...personsFiltered];
    setPersonsFiltered(newPersonArray);
    localStorage.setItem("persons", JSON.stringify(newPersonArray));
  };

  const deletePersonHandler = (id) => {
    const updatedPersons = personsFiltered.filter((person) => person.id !== id);
    setPersonsFiltered(updatedPersons);
    localStorage.setItem("persons", JSON.stringify(updatedPersons));
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.18),_transparent_28%),linear-gradient(180deg,_#0a0a0a_0%,_#111827_35%,_#0a0a0a_100%)] text-white">
      <div className="mx-auto w-full max-w-6xl px-4 pt-10 sm:pt-14">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/60 shadow-2xl backdrop-blur">
          <div className="relative px-6 py-10 sm:px-10 sm:py-14">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:32px_32px] opacity-20"></div>

            <div className="relative z-10 text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">
                App de armado de equipos
              </p>
              <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
                ARMA TU EQUIPO
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-zinc-300 sm:text-base">
                Cargá jugadores, asignales nivel de skill y prepará una base
                clara para sortear o construir equipos de fútbol más parejos.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <div className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">
                  {personsFiltered.length} jugadores cargados
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300">
                  Estética renovada
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300">
                  Datos persistidos en localStorage
                </div>
              </div>
            </div>
          </div>
        </div>

        <NewPerson onAddPerson={addPersonHandler} />

        <section className="mt-12">
          <div className="mb-5 text-center">
            <h2 className="text-2xl font-black sm:text-3xl">
              Jugadores cargados
            </h2>
            <p className="mt-2 text-sm text-zinc-400">
              Revisá la lista antes de generar los equipos.
            </p>
          </div>

          <div className="text-center">
            {personsFiltered.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/10 bg-zinc-900/40 px-6 py-12">
                <p className="text-lg font-semibold text-white">
                  No hay personas cargadas
                </p>
                <p className="mt-2 text-sm text-zinc-400">
                  Empezá agregando algunos jugadores desde el formulario.
                </p>
              </div>
            ) : (
              <Person
                persons={personsFiltered}
                onDelete={deletePersonHandler}
              />
            )}
          </div>
        </section>

        <section className="mt-12">
          <CreateTeams persons={personsFiltered} />
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
