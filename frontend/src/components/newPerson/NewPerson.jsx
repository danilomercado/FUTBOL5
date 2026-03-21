import React, { useState } from "react";

const NewPerson = ({ onAddPerson }) => {
  const [name, setName] = useState("");
  const [filigranas, setFiligranas] = useState("");
  const [opinion, setOpinion] = useState("");
  const [warningMessage, setWarningMessage] = useState("");
  const [formError, setFormError] = useState("");

  const changeNameHandler = (e) => {
    const value = e.target.value;

    if (value.length <= 10) {
      setName(value);
      setFormError("");
    } else {
      setFormError("El nombre debe tener 10 caracteres o menos.");
    }
  };

  const changeFiligranasHandler = (e) => {
    const value = e.target.value;
    setFiligranas(value);

    const minStars = 1;
    const maxStars = 5;
    const parsedFiligranas = parseInt(value);

    if (
      isNaN(parsedFiligranas) ||
      parsedFiligranas < minStars ||
      parsedFiligranas > maxStars
    ) {
      setWarningMessage(
        `El valor debe estar entre ${minStars} y ${maxStars} estrellas.`,
      );
    } else {
      setWarningMessage("");
      setFormError("");
    }
  };

  const changeOpinionHandler = (e) => {
    setOpinion(e.target.value);
  };

  const submitPersonHandler = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setFormError("Ingresá un nombre válido.");
      return;
    }

    if (filigranas === "" || warningMessage) {
      setFormError(
        "Por favor, ingresá un número de estrellas válido entre 1 y 5.",
      );
      return;
    }

    const minStar = 1;
    const maxStar = 5;
    const finalFiligranas = Array(
      Math.min(Math.max(parseInt(filigranas), minStar), maxStar),
    ).fill("⭐");

    const newPerson = {
      personName: name.trim(),
      personFiligranas: finalFiligranas,
      personOpinion: opinion.trim(),
    };

    onAddPerson(newPerson);
    setName("");
    setFiligranas("");
    setOpinion("");
    setWarningMessage("");
    setFormError("");
  };

  return (
    <div className="mx-auto mt-8 w-full max-w-5xl px-4">
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/70 shadow-2xl backdrop-blur">
        <div className="grid lg:grid-cols-[1.05fr_1.4fr]">
          <div className="border-b border-white/10 bg-gradient-to-br from-emerald-900 via-emerald-800 to-lime-700 p-8 lg:border-b-0 lg:border-r">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-emerald-100/80">
              Modo DT
            </p>
            <h2 className="text-3xl font-black leading-tight text-white">
              Cargá jugadores y prepará el partido
            </h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-emerald-50/90">
              Armá tu plantel rápido, puntuá habilidades del 1 al 5 y después
              usalos para crear equipos más equilibrados.
            </p>

            <div className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-5">
              <p className="text-sm text-white/90">
                <span className="font-bold">Tip:</span> usá nombres cortos y
                skills reales para que el armado de equipos tenga más sentido.
              </p>
            </div>
          </div>

          <form onSubmit={submitPersonHandler} className="p-6 sm:p-8">
            <div className="grid gap-5">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-bold uppercase tracking-wide text-zinc-200"
                >
                  Nombre del jugador
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  placeholder="Máximo 10 caracteres"
                  required
                  onChange={changeNameHandler}
                  className="w-full rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label
                  htmlFor="filigranas"
                  className="mb-2 block text-sm font-bold uppercase tracking-wide text-zinc-200"
                >
                  Skills
                </label>
                <input
                  value={filigranas}
                  onChange={changeFiligranasHandler}
                  type="number"
                  name="filigranas"
                  id="filigranas"
                  required
                  placeholder="Estrellas entre 1 y 5"
                  className="w-full rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
                {warningMessage && (
                  <p className="mt-2 text-sm text-red-400">{warningMessage}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="opinion"
                  className="mb-2 block text-sm font-bold uppercase tracking-wide text-zinc-200"
                >
                  Observación
                </label>
                <textarea
                  id="opinion"
                  name="opinion"
                  rows="3"
                  value={opinion}
                  onChange={changeOpinionHandler}
                  placeholder="Ej: corre mucho, buen pase, define bien..."
                  className="w-full resize-none rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              {formError && (
                <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  {formError}
                </div>
              )}

              <div className="pt-2">
                <button className="w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-lime-400 px-6 py-3 text-base font-bold text-zinc-950 transition hover:scale-[1.01]">
                  Agregar jugador
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewPerson;
