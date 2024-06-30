import { useEffect, useState } from "react";
import {
  ICategory,
  ICategoryData,
  IExpense,
  IExpenseData,
  ISubCategory,
} from "../interface/interface";
import {
  getCategory,
  getCurrentDate,
  getExpense,
  getSubCategory,
} from "../helper/controller";
import { useDisclosure } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { SUpsertCategory, SUpsertExpense } from "../interface/schema";
import { APostExpense, APutExpense } from "../helper/api";
import { zodResolver } from "@hookform/resolvers/zod";

export const useCategory = () => {
  const {
    isOpen: isOpenUpsert,
    onOpen: onOpenUpsert,
    onOpenChange: onOpenChangeUpsert,
    onClose,
  } = useDisclosure();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
    setValue,
    getValues,
  } = useForm<ICategoryData>({
    resolver: zodResolver(SUpsertCategory),
    mode: "onSubmit",
    values: {
      name: "",
      id: ""
    },
  });

  useEffect(() => {
    getCategory(setCategory);
  }, []);


  useEffect(() => {
    getExpense(
      setExpenseList,
      getValues("page"),
      getValues("pageSize"),
      setValue
    );
  }, [getValues("page")]);

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const expenseForm = new FormData();
    try {
      expenseForm.append("name", getValues("name"));
      expenseForm.append("price", getValues("price"));
      expenseForm.append("comment", getValues("comment"));
      expenseForm.append("category", getValues("category"));
      expenseForm.append("sub_category", String(getValues("sub_category")));
      expenseForm.append("users_permissions_user", "1");

      let data: any = getValues();
      data["users_permissions_user"] = 1;
      let body = {
        data,
      };

      APostExpense(body)
        .then((res) => {
          getExpense(setExpenseList, 1, getValues("pageSize"), setValue);
          setValue("id", "", { shouldValidate: true });
          setValue("name", "", { shouldValidate: true });
          setValue("comment", "", { shouldValidate: true });
          setValue("price", "", { shouldValidate: true });
          setValue("sub_category", "", { shouldValidate: true });
          onClose();
        })
        .catch((err) => {
          console.log("err:", err);
        });
      if (getValues("id")) {
        let data: any = getValues();
        let putBody = {
          data,
        };
        APutExpense(putBody, getValues("id"))
          .then((res) => {
            onClose();
          })
          .catch((err) => {});
      }
    } catch (err) {
      console.log(err);
    }
  };

  return {
    expenseList,
    onOpenChangeUpsert,
    onOpenUpsert,
    isOpenUpsert,
    setValue,
    getValues,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    reset,
    control,
    onSubmitForm,
    category,
    subCategory,
  };
};
