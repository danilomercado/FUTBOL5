import React, { useState } from "react";

const NewPerson = ({ onAddPerson }) => {
  const [name, setName] = useState("");
  const [filigranas, setFiligranas] = useState("");
  const [opinion, setOpinion] = useState("");
  const [warningMessage, setWarningMessage] = useState(""); // Para mostrar advertencias
  const [formError, setFormError] = useState(""); // Para el error global del formulario

  const changeNameHandler = (e) => {
    setName(e.target.value);
  };

  const changeFiligranasHandler = (e) => {
    const value = e.target.value;
    setFiligranas(value);

    // Validación para filigranas
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
      setWarningMessage(""); // Borra el mensaje si el valor es válido
    }
  };

  const changeOpinionHandler = (e) => {
    setOpinion(e.target.value);
  };

  const submitPersonHandler = (e) => {
    e.preventDefault();

    const minStar = 1;
    const maxStar = 5;

    // Verificación final para la cantidad de filigranas
    if (filigranas === "" || warningMessage) {
      setFormError(
        "Por favor, ingrese un número de estrellas válido entre 1 y 5."
      );
      return; // Evita el envío si hay un error
    } else {
      setFormError(""); // Borra el error si todo está bien
    }

    // Procesar las estrellas
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
    <div className="flex items-center justify-center p-12">
      <div className="mx-auto w-full max-w-[550px] bg-white">
        <form onSubmit={submitPersonHandler}>
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
              placeholder="Nombre"
              required
              onChange={changeNameHandler}
              className="w-full rounded-md border border-green-600 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#1f4b2c] focus:shadow-md"
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
              className="w-full rounded-md border border-green-600 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#1f4b2c] focus:shadow-md"
            />
            {warningMessage && (
              <p className="text-red-500 mt-1">{warningMessage}</p>
            )}
          </div>

          {/* Error global del formulario */}
          {formError && <p className="text-red-500">{formError}</p>}

          <div>
            <button className="hover:shadow-form rounded-md bg-[#094111] py-3 px-8 text-base font-semibold text-white outline-none">
              Agregar Persona
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPerson;
