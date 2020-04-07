import React from "react";

const PersonAttribute = props => {
  const { title, value } = props;

  return (
    <div>
      <p>
        {" "}
        <strong> {title} </strong> {value}{" "}
      </p>
    </div>
  );
};

export default PersonAttribute;
