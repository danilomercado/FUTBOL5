import React, { useEffect, useState } from "react";
import NewPerson from "../newPerson/NewPerson";
import Person from "../person/Person";
import CreateTeams from "../createTeams/CreateTeams";
import Footer from "../footer/Footer";
import {
  getPlayersRequest,
  createPlayerRequest,
  deletePlayerRequest,
} from "../../services/playerService";
import { useAuth } from "../../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPlayers = async () => {
    try {
      setLoading(true);

      const data = await getPlayersRequest();

      const mappedPlayers = data.map((player) => ({
        id: player.id,
        personName: player.personName,
        personFiligranas: Array(player.skillCount).fill("⭐"),
      }));

      setPersons(mappedPlayers);
    } catch (error) {
      console.error("Error al cargar jugadores:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlayers();
  }, []);

  const addPersonHandler = async (newPerson) => {
    try {
      const createdPlayer = await createPlayerRequest({
        personName: newPerson.personName,
        skillCount: newPerson.personFiligranas.length,
      });

      const mappedPlayer = {
        id: createdPlayer.id,
        personName: createdPlayer.personName,
        personFiligranas: Array(createdPlayer.skillCount).fill("⭐"),
      };

      setPersons((prevPersons) => [mappedPlayer, ...prevPersons]);
    } catch (error) {
      console.error("Error al crear jugador:", error);
      alert(error?.response?.data?.message || "Error al crear jugador");
    }
  };

  const deletePersonHandler = async (id) => {
    try {
      await deletePlayerRequest(id);

      setPersons((prevPersons) =>
        prevPersons.filter((person) => person.id !== id),
      );
    } catch (error) {
      console.error("Error al borrar jugador:", error);
      alert(error?.response?.data?.message || "Error al borrar jugador");
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.18),_transparent_28%),linear-gradient(180deg,_#0a0a0a_0%,_#111827_35%,_#0a0a0a_100%)] text-white">
      <div className="mx-auto w-full max-w-6xl px-4 pt-10 sm:pt-14">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/60 shadow-2xl backdrop-blur">
          <div className="relative px-6 py-10 sm:px-10 sm:py-14">
            <div className="relative z-10 text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">
                App de armado de equipos
              </p>

              <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
                ARMA TU EQUIPO
              </h1>

              <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-zinc-300 sm:text-base">
                Bienvenido, {user?.name}. Tus jugadores quedan guardados en tu
                cuenta.
              </p>
            </div>
          </div>
        </div>

        <NewPerson onAddPerson={addPersonHandler} />

        <section className="mt-12">
          <div className="mb-5 text-center">
            <h2 className="text-2xl font-black sm:text-3xl">
              Jugadores cargados
            </h2>
          </div>

          {loading ? (
            <p className="text-center text-zinc-400">Cargando jugadores...</p>
          ) : (
            <Person persons={persons} onDelete={deletePersonHandler} />
          )}
        </section>

        <section className="mt-12">
          <CreateTeams persons={persons} />
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
