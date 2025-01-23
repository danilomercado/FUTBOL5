import React, { useEffect, useState } from "react";
import NewPerson from "../newPerson/NewPerson";
import Person from "../person/Person";

const persons = [
  {
    id: 1,
    name: "Elian",
    filigranas: 5,
  },
];

const Dashboard = () => {
  const [personsFiltered, setPersonsFiltered] = useState(persons);

  useEffect(() => {
    const personStored = JSON.parse(localStorage.getItem("persons"));
    if (Array.isArray(personStored)) {
      setPersonsFiltered(personStored);
    }
  }, []);
  const addPersonHandler = (newPerson) => {
    // Generamos un ID único para cada persona
    const personData = { ...newPerson, id: Math.random() };
    const newPersonArray = [personData, ...personsFiltered];
    setPersonsFiltered(newPersonArray);
    localStorage.setItem("persons", JSON.stringify(newPersonArray));
  };

  const deletePersonHandler = (id) => {
    setPersonsFiltered((prevPerson) =>
      prevPerson.filter((person) => person.id !== id)
    );
  };
  return (
    <>
      <div className="max-w-3xl mx-auto text-center mt-16">
        <h1 className="text-4xl font-bold text-black-900 leading-tight mb-2 border-t-4 border-b-4 border-green-600 py-4">
          ARMA TU EQUIPO
        </h1>
        <NewPerson onAddPerson={addPersonHandler} />
        <div className="text-2xl font-bold text-black-900 ">
          <h3>Personas Agregadas</h3>
        </div>
      </div>
      <div className="text-2xl font-bold text-black-900 ">
        <div className="flex flex-wrap gap-4 mt-4 justify-center">
          {personsFiltered.length === 0 ? (
            <p>No hay personas cargadas</p>
          ) : (
            <Person persons={personsFiltered} onDelete={deletePersonHandler} />
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
