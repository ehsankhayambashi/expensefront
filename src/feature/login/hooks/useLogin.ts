import FetchApi from "@/utils/FetchApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ILoginData } from "../interface";
import { SLoginUser } from "../interface/schema";

export const useLogin = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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
  } = useForm<ILoginData>({
    resolver: zodResolver(SLoginUser),
    mode: "onSubmit",
    values: {
      identifier: "",
      password: "",
    },
  });
  return {
    setValue,
    getValues,
    register,
    errors,
    handleSubmit,
    router,
    isSubmitting,
    loading,
    setLoading,
  };
};
