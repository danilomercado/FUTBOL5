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
      setFormError(""); // Borra el error si está dentro del límite
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
        `El valor debe estar entre ${minStars} y ${maxStars} estrellas.`
      );
    } else {
      setWarningMessage("");
    }
  };

  const changeOpinionHandler = (e) => {
    setOpinion(e.target.value);
  };

  const submitPersonHandler = (e) => {
    e.preventDefault();

    if (filigranas === "" || warningMessage) {
      setFormError(
        "Por favor, ingrese un número de estrellas válido entre 1 y 5."
      );
      return;
    }

    const minStar = 1;
    const maxStar = 5;
    const finalFiligranas = Array(
      Math.min(Math.max(parseInt(filigranas), minStar), maxStar)
    ).fill("⭐");

    const newPerson = {
      personName: name,
      personFiligranas: finalFiligranas,
    };

    onAddPerson(newPerson);
    setName("");
    setFiligranas("");
    setOpinion("");
  };

  return (
    <div className="flex items-center justify-center p-6 sm:p-12">
      <div className="mx-auto w-full max-w-[550px]rgb(206, 206, 206) shadow-md rounded-lg">
        <form onSubmit={submitPersonHandler} className="p-6 sm:p-8">
          <div className="mb-5">
            <label
              htmlFor="name"
              className="mb-3 block text-base font-bold text-[#000000]"
            >
              NOMBRE
            </label>
            <input
              type="text"
              name="name"
              value={name}
              id="name"
              placeholder="Máximo 10 caracteres"
              required
              onChange={changeNameHandler}
              className="w-full rounded-md border border-green-600 bg-white py-3 px-4 sm:px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#1f4b2c] focus:shadow-md"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="filigranas"
              className="mb-3 block text-base font-bold text-[#000000]"
            >
              SKILLS
            </label>
            <input
              value={filigranas}
              onChange={changeFiligranasHandler}
              type="number"
              name="filigranas"
              id="filigranas"
              required
              placeholder="Estrellas entre 1 y 5"
              className="w-full rounded-md border border-green-600 bg-white py-3 px-4 sm:px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#1f4b2c] focus:shadow-md"
            />
            {warningMessage && (
              <p className="text-red-500 mt-1 text-sm">{warningMessage}</p>
            )}
          </div>

          <div>
            <button className="w-full sm:w-auto hover:shadow-form rounded-md bg-[#094111] py-3 px-6 text-base font-semibold text-white outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#094111]">
              Agregar Persona
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPerson;
