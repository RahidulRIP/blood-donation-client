import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";

const instance = axios.create({
  baseURL: "https://blood-donation-server-bay-six.vercel.app",
});

const useAxiosSecure = () => {
  const { user, signUserOut } = useAuth();
  useEffect(() => {
    const reqInterceptor = instance.interceptors.request.use(
      (config) => {
        if (user?.accessToken) {
          config.headers.Authorization = `bearer ${user?.accessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const resInterceptor = instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        const errorStatus = error?.response?.status;
        if (errorStatus === 401 || errorStatus === 403) {
          signUserOut()
            .then(() => {})
            .catch((err) => {
              console.log(err);
            });
        }
        return Promise.reject(error);
      }
    );

    return () => {
      instance.interceptors.request.eject(reqInterceptor);
      instance.interceptors.response.eject(resInterceptor);
    };
  }, [user, signUserOut]);
  return instance;
};

export default useAxiosSecure;
