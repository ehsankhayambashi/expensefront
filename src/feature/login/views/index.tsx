"use client";

import React from "react";
import mellatLogo from "./Mellatlogo.png";
import { Input } from "@nextui-org/react";
const index = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <section className="relative flex justify-center items-center w-screen h-screen flex-wrap overflow-hidden">
        <div className="absolute w-full h-full bg-gradient-to-b from-white via-blue-500 to-white animate-login-animate"></div>
        {Array.from({ length: 200 }).map((_, i) => (
          <span
            key={i}
            className="login-span relative block bg-[#f1f1f1] transition duration-[1.5s] hover:bg-blue-500"
          ></span>
        ))}
        <div className="absolute w-96 bg-[#eee] z-10 flex justify-center items-center p-10 rounded-lg shadow-lg">
          <div className="flex flex-col items-center gap-10">
            {/* logo */}
            <div className="flex flex-col items-center">
              <div className="w-14">
                <img src={"./Mellatlogo.png"} className="w-full h-full" />
              </div>
              <p>سامانه بانک ملت</p>
            </div>
            <div className="flex flex-col gap-6 w-full">
              <div className="w-full">
                <label className="text-asiatech-gray-700" dir="ltr">
                  نام کاربری
                </label>
                <Input
                  variant="bordered"
                  type="text"
                  placeholder=""
                  className="w-full mt-1"
                  // value={getValues("first_name")}
                  classNames={{
                    input: "placeholder:text-asiatech-gray-500",
                    inputWrapper: [
                      "backdrop-saturate-200",
                      "focus-within:!border-asiatech-gray-500 !border-1",
                      "inputWrapper: h-[40px]",
                    ],
                  }}
                  onChange={(e: any) => {
                    //   setValue("first_name", e.target.value, { shouldValidate: true });
                  }}
                />
                {/* {errors.first_name && (
                <p className="text-red-500 pt-2 text-sm">{`${errors.first_name.message}`}</p>
              )} */}
              </div>
              <div className="relative w-full">
                <input
                  type="password"
                  required
                  className="relative w-full bg-[#ddd] border-none outline-none p-6 pt-8 rounded-md text-black font-medium login-input"
                />
                <i className="absolute left-0 px-4 py-2.5 text-gray-700 transition-transform duration-500 pointer-events-none">
                  Password
                </i>
              </div>
              <div className="flex justify-between">
                <a href="#" className="text-black">
                  Forgot Password
                </a>
                <a href="#" className="text-blue-500 font-semibold">
                  Signup
                </a>
              </div>
              <input
                type="submit"
                value="Login"
                className="p-2.5 bg-blue-500 text-white font-semibold text-xl tracking-wider cursor-pointer"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default index;
