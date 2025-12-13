import axios from "axios";

const instance = axios.create({
  baseURL: "https://blood-donation-server-bay-six.vercel.app",
});
const useAxios = () => {
  return instance;
};

export default useAxios;
