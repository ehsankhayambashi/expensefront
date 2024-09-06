import CircleCheckIcon from "@/app/assets/icons/CircleCheckIcon";
import CircleInfoIcon from "@/app/assets/icons/CircleInfoIcon";
import CrossIcon from "@/app/assets/icons/CrossIcon";
import TriangleExclamationIcon from "@/app/assets/icons/TriangleExclamationIcon";
import { FC } from "react";
import { Toast } from "react-hot-toast";

interface ToastAlertInterface {
  status?: string;
  hotToast: Toast;
  className?: string;
  message: string;
  loading: boolean;
}

const ToastAlert: FC<ToastAlertInterface> = ({
  status = "default",
  hotToast,
  className,
  message,
  loading,
}) => {
  return (
    <>
      <div className="w-[250px] sm:w-96 flex">
        <div
          className={`${
            hotToast.visible ? "animate-enter" : "animate-leave"
          } max-w-md min-h-16 w-full bg-white shadow-lg rounded-14 p-2`}
        >
          <div
            className={`w-full h-full flex items-center justify-between ${className}`}
          >
            <div className="w-full flex">
              <span
                className={`w-8 h-8 flex justify-center items-center text-white rounded-lg ${
                  status === "success"
                    ? "bg-asiatech-green-900 "
                    : status === "error"
                    ? "bg-asiatech-red-900 "
                    : status === "warn"
                    ? "bg-asiatech-orange-900 "
                    : status === "default"
                    ? "bg-asiatech-blue-901"
                    : ""
                }`}
              >
                {status === "success" ? (
                  <CircleCheckIcon className="w-6 h-6" />
                ) : status === "error" ? (
                  <CrossIcon className="w-6 h-6" />
                ) : status === "warn" ? (
                  <TriangleExclamationIcon className="w-6 h-6" />
                ) : status === "default" ? (
                  <CircleInfoIcon className="w-6 h-6" />
                ) : (
                  ""
                )}
              </span>
              <span className="w-[calc(100%-2rem)] pr-3 pt-1 break-words">
                {message}
              </span>
            </div>
          </div>
          {/* {loading ? <div className="loader-line"></div> : <></>} */}
        </div>
      </div>
    </>
  );
};

export default ToastAlert;
