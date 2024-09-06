import FetchApi from "@/utils/FetchApi";
import { APostLogin } from "./api";
import Notify from "@/utils/Notify";

export const loginUser = (body: any, router: any, setLoading: Function) => {
  APostLogin(body)
    .then((res: any) => {
      localStorage.setItem("access", res.data.jwt);
      FetchApi.setToken(res.data.jwt);
      if (typeof window != "undefined") {
        window.location.href = "/expense";
      }
    })
    .catch((error: any) => {
      Notify.error(error.data.error.message);
      setLoading(false);
    });
};
