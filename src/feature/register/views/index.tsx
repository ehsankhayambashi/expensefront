"use client";

import { Button, Input, Link } from "@nextui-org/react";
import { registerUser } from "../helper/controller";
import { useRegister } from "../hooks/useRegister";

const Index = () => {
  const { errors, getValues, register, setValue, handleSubmit, router } =
    useRegister();
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
            <form
              className="rounded-14 px-12 py-8 bg-asiatech-gray-50 w-[350px] flex flex-col items-center"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit((handleSubmitData) => {
                  registerUser(handleSubmitData, router);
                  //  loginHandler(handleSubmitData, router, reset);
                })();
              }}
            >
              {/* logo */}
              <div className="flex flex-col items-center">
                <div className="text-4xl">💸</div>
                <p>جیب‌سنج</p>
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
                    value={getValues("username")}
                    classNames={{
                      input: "placeholder:text-asiatech-gray-500",
                      inputWrapper: [
                        "backdrop-saturate-200",
                        "focus-within:!border-asiatech-gray-500 !border-1",
                        "inputWrapper: h-[40px]",
                      ],
                    }}
                    onChange={(e: any) => {
                      setValue("username", e.target.value, {
                        shouldValidate: true,
                      });
                    }}
                  />
                  {errors.username && (
                    <p className="text-red-500 pt-2 text-sm">{`${errors.username.message}`}</p>
                  )}
                </div>
                <div className="w-full">
                  <label className="text-asiatech-gray-700" dir="ltr">
                    ایمیل
                  </label>
                  <Input
                    variant="bordered"
                    type="text"
                    placeholder=""
                    className="w-full"
                    value={getValues("email")}
                    classNames={{
                      input: "placeholder:text-asiatech-gray-500",
                      inputWrapper: [
                        "backdrop-saturate-200",
                        "focus-within:!border-asiatech-gray-500 !border-1",
                        "inputWrapper: h-[40px]",
                      ],
                    }}
                    onChange={(e: any) => {
                      setValue("email", e.target.value, {
                        shouldValidate: true,
                      });
                    }}
                  />
                  {errors.email && (
                    <p className="text-red-500 pt-2 text-sm">{`${errors.email.message}`}</p>
                  )}
                </div>
                <div className="w-full">
                  <label className="text-asiatech-gray-700" dir="ltr">
                    رمز عبور
                  </label>
                  <Input
                    variant="bordered"
                    type="password"
                    placeholder=""
                    className="w-full mt-1"
                    value={getValues("password")}
                    classNames={{
                      input: "placeholder:text-asiatech-gray-500",
                      inputWrapper: [
                        "backdrop-saturate-200",
                        "focus-within:!border-asiatech-gray-500 !border-1",
                        "inputWrapper: h-[40px]",
                      ],
                    }}
                    onChange={(e: any) => {
                      setValue("password", e.target.value, {
                        shouldValidate: true,
                      });
                    }}
                  />
                  {errors.password && (
                    <p className="text-red-500 pt-2 text-sm">{`${errors.password.message}`}</p>
                  )}
                </div>
                <div className="w-full">
                  <label className="text-asiatech-gray-700" dir="ltr">
                    تکرار رمز عبور
                  </label>
                  <Input
                    variant="bordered"
                    type="password"
                    placeholder=""
                    className="w-full mt-1"
                    value={getValues("confirmPassword")}
                    classNames={{
                      input: "placeholder:text-asiatech-gray-500",
                      inputWrapper: [
                        "backdrop-saturate-200",
                        "focus-within:!border-asiatech-gray-500 !border-1",
                        "inputWrapper: h-[40px]",
                      ],
                    }}
                    onChange={(e: any) => {
                      setValue("confirmPassword", e.target.value, {
                        shouldValidate: true,
                      });
                    }}
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 pt-2 text-sm">{`${errors.confirmPassword.message}`}</p>
                  )}
                </div>
                <Button type="submit" color="primary" className="w-full">
                  ثبت نام
                </Button>
                <div className="w-full flex gap-1 justify-center text-sm">
                  <p>حساب کاربری دارید؟</p>
                  <Link
                    size="sm"
                    onClick={() => {
                      router.push("/login");
                    }}
                    className="cursor-pointer"
                  >
                    ورود
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
