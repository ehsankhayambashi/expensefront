import FetchApi from "@/utils/FetchApi";
import { APostUser } from "./api";
import Notify from "@/utils/Notify";

export const registerUser = (body: any, router: any) => {
  APostUser(body)
    .then((res: any) => {
      if (typeof window != "undefined") {
        localStorage.setItem("access", res.data.jwt);
      }
      FetchApi.setToken(res.data.jwt);
      if (typeof window != "undefined") {
        window.location.href = "/expense";
      }
    })
    .catch((error: any) => {
      Notify.error(error.data.error.message);
    });
};
