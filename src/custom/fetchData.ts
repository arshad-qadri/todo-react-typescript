import axios from "axios";
import { baseUrl } from "../variable";

export const fetchData = () => {
  return axios.get(`${baseUrl}/allTodo`);
};
