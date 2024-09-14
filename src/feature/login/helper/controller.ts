import FetchApi from "@/utils/FetchApi";
import { APostLogin } from "./api";
import Notify from "@/utils/Notify";
import Cookies from "js-cookie";

export const loginUser = (body: any, router: any, setLoading: Function) => {
  APostLogin(body)
    .then((res: any) => {
      // تنظیم کوکی با document.cookie
      const token = res.data.jwt;
      Cookies.set("access", res.data.jwt, { expires: 60 * 60 * 24 * 365 * 10 });
      // تنظیم توکن در localStorage برای استفاده در سمت کلاینت
      if (typeof window !== "undefined") {
        localStorage.setItem("access", token);
      }

      // تنظیم توکن در API utility برای درخواست‌های بعدی
      FetchApi.setToken(token);

      // تغییر مسیر به صفحه "expense"
      if (typeof window !== "undefined") {
        window.location.href = "/expense";
      }
    })
    .catch((error: any) => {
      Notify.error(error.data.error.message);
      setLoading(false);
    });
};
