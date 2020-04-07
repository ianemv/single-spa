import axios from "axios";

const baseURL = "https://swapi.co/api/";

export function getPeople(pageNum = 1) {
  return axios.get(`${baseURL}people?page=${pageNum}`);
}

export function addId(entity) {
  if (!entity) return "";
  if (entity.url) {
    const values = entity.url.split("/");
    for (let i = values.length; i > 0; i--) {
      const value = values[i];
      if (value != undefined && value !== "") {
        if (value.indexOf("?") === -1 && !isNaN(+value)) {
          return value;
        }
      }
    }
    return "unknown";
  }
}
