import FetchApi from "@/utils/FetchApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { IRegisterData } from "../interface";
import { SRegisterUser } from "../interface/schema";

export const useRegister = () => {
  const router = useRouter();
  useEffect(() => {
    FetchApi.startLogin();
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
    setValue,
    getValues,
  } = useForm<IRegisterData>({
    resolver: zodResolver(SRegisterUser),
    mode: "onSubmit",
    values: {
      confirmPassword: "",
      email: "",
      password: "",
      username: "",
    },
  });
  return {
    setValue,
    getValues,
    register,
    errors,
    handleSubmit,
    router,
  };
};
