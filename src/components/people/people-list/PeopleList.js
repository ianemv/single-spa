import React from "react";
import { withRouter, Link } from "react-router-dom";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { getId } from "../../../utils/api";

function PeopleList(props) {
  const { loading, people } = props;

  return (
    <ListGroup>
      {people !== undefined ? (
        people.map((person, i) => {
          return (
            <ListGroupItem>
              <Link
                key={person.name}
                to={`/people/${window.encodeURIComponent(person.id)}`}
              >
                {person.name}{" "}
              </Link>
            </ListGroupItem>
          );
        })
      ) : (
        <div></div>
      )}
    </ListGroup>
  );
}

export default withRouter(PeopleList);
