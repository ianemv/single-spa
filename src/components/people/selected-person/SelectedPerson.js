import React from "react";
import PersonAttribute from "./PersonAttribute";

function SelectedPerson({ person }) {
  return (
    <div>
      {person !== undefined ? (
        <div>
          <PersonAttribute title="Name" value={person.name} />
          <PersonAttribute title="Height" value={person.height} />
          <PersonAttribute title="Mass" value={person.mass} />
          <PersonAttribute title="Hair Color" value={person.hair_color} />
          <PersonAttribute title="Gender" value={person.gender} />
          <PersonAttribute title="Birth Year" value={person.birth_year} />
        </div>
      ) : (
        <p> No character selected </p>
      )}
    </div>
  );
}

export default SelectedPerson;
