import { Logout } from "@/utils/Logout";
import { APostReport } from "./api";

export const getChart = (setOption: Function, body: any, userId: number) => {
  if (userId != undefined) {
    APostReport(body, userId)
      .then((json: any) => {
        console.log(json);
        setOption(json.data);
      })
      .catch((err) => {
        if (err.status == 401) {
          Logout();
        }
      });
  }
};
