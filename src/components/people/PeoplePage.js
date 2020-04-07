import React, { useReducer, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import PeopleList from "./people-list/PeopleList";
import SelectedPerson from "./selected-person/SelectedPerson";
import { getPeople, addId } from "../../utils/api";

const initialState = {
  pageNum: 1,
  nextPage: true,
  loadingPeople: true,
  selectedPerson: undefined,
  people: []
};

function PeoplePage(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { match } = props;
  const { params = {} } = match;
  const { personId } = params;

  const { nextPage, loadingPeople, people, selectedPerson, pageNum } = state;

  useEffect(() => {
    if (nextPage && loadingPeople) {
      dispatch({ type: "loadingPeople" });

      const fetchPeople = getPeople(pageNum)
        .then(results => {
          const { data } = results;
          dispatch({ type: "newPeople", results: data });
        })
        .catch(function(err) {
          console.log("err", err); // eslint-disable-line
        });
    }
  }, [pageNum, nextPage, loadingPeople]);

  useEffect(() => {
    if (
      (state.selectedPerson === undefined && personId !== undefined) ||
      (state.selectedPerson && personId !== state.selectedPerson.id)
    ) {
      const person = state.people.find(p => p.id === personId);
      if (person) {
        dispatch({ type: "selectPerson", person });
      }
    }
  }, [state.people, state.selectedPerson, personId]);

  return (
    <Container className="mt-4">
      <Row>
        <Col sm={4}>
          <Button
            className="mb-4"
            onClick={fetchMore}
            disabled={!nextPage || loadingPeople}
          >
            {loadingPeople ? "Loading.." : "Load more people"}
          </Button>
          <PeopleList people={people} />
        </Col>
        <Col sm={8}>
          <SelectedPerson person={selectedPerson} />
        </Col>
      </Row>
    </Container>
  );

  function fetchMore() {
    dispatch({ type: "fetchMore" });
  }
}

export default PeoplePage;

function reducer(state = initialState, action) {
  switch (action.type) {
    case "loadingPeople":
      return { ...state, loadingPeople: true };
    case "newPeople":
      const data = action.results.results.map(person => {
        const id = addId(person);
        return { ...person, id };
      });

      return {
        ...state,
        people: state.people.concat(data),
        nextPage: Boolean(action.results.next),
        loadingPeople: false
      };
    case "selectPerson":
      return {
        ...state,
        selectedPerson: action.person
      };
    case "fetchMore":
      return {
        ...state,
        loadingPeople: true,
        pageNum: state.pageNum + 1
      };
    default:
      throw Error(`Unknown action type '${action.type}'`);
  }
}
