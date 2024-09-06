import { getCurrentDate } from "@/feature/expense/helper/controller";
import { useForm } from "react-hook-form";
import { IReportFields } from "../interface";
import { useEffect, useState } from "react";
import { getChart } from "../helper/controller";
import { useUser } from "@/context/UserContext";
import { useAuth } from "@/feature/login/hooks/useAuth";

export const useReports = () => {
  const [option, setOption] = useState();
  const { userId } = useUser();
  // useEffect(() => {
  //   if (option) {
  //     getChart(setOption, getValues(), userId);
  //   }
  // }, [option]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
    setValue,
    getValues,
  } = useForm<IReportFields>({
    // resolver: zodResolver(SUpsertExpense),
    mode: "onSubmit",
    defaultValues: {
      startDate: "null",
      endDate: "null",
      type: "pie",
    },
  });
  return { setValue, getValues, option, setOption, userId };
};
