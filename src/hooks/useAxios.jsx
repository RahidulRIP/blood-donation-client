import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:9000",
});
const useAxios = () => {
  return instance;
};

export default useAxios;
