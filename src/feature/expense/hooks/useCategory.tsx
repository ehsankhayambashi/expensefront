import { useEffect, useState } from "react";
import { ICategory, ICategoryData, IExpenseData } from "../interface/interface";
import { getCategory } from "../helper/controller";
import { useDisclosure } from "@nextui-org/react";
import { useForm, UseFormSetValue } from "react-hook-form";
import { SUpsertCategory, SUpsertExpense } from "../interface/schema";
import { APostCategory, APostExpense, APutExpense } from "../helper/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "@/context/UserContext";

export const useCategory = (
  setCategories: Function,
  setValue: UseFormSetValue<IExpenseData>
) => {
  const {
    isOpen: isOpenCat,
    onOpen: onOpenCat,
    onOpenChange: onOpenChangeCat,
    onClose,
  } = useDisclosure();
  const { userId } = useUser();
  const {
    register,
    handleSubmit: handleSubmitCat,
    formState: { errors: errorsCat, isSubmitting },
    reset,
    control,
    setValue: setValueCat,
    getValues: getValuesCat,
  } = useForm<ICategoryData>({
    resolver: zodResolver(SUpsertCategory),
    mode: "onSubmit",
    values: {
      name: "",
    },
  });

  useEffect(() => {
    if (!isOpenCat) {
      getCategory(setCategories, userId);
    }
  }, [isOpenCat]);

  const onSubmitFormCat = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = {
        data: {
          ...getValuesCat(),
          users_permissions_user: userId,
        },
      };
      APostCategory(data)
        .then((res) => {
          setValue("category", String(res.data.data.id), {
            shouldValidate: true,
          });
          onClose();
        })
        .catch((err) => {});
    } catch (err) {}
  };

  return {
    setValueCat,
    getValuesCat,
    register,
    handleSubmitCat,
    errorsCat,
    isSubmitting,
    reset,
    control,
    onSubmitFormCat,
    isOpenCat,
    onOpenCat,
    onOpenChangeCat,
  };
};
