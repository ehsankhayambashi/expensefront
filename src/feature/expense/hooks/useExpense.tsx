import { zodResolver } from "@hookform/resolvers/zod";
import { useDisclosure } from "@nextui-org/react";
import { useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { APostExpense, APutExpense } from "../helper/api";
import {
  getCategory,
  getCurrentDate,
  getExpense,
  getSubCategory,
} from "../helper/controller";
import {
  ICategory,
  IExpense,
  IExpenseData,
  ISubCategory,
} from "../interface/interface";
import { SUpsertExpense } from "../interface/schema";

import { useUser } from "@/context/UserContext";

export const useExpense = () => {
  const [expenseList, setExpenseList] = useState<IExpense[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [subCategory, setSubCategory] = useState<ISubCategory[]>([]);
  const [selectedExpense, setSelectedExpense] = useState<IExpense>();
  const { userId } = useUser();

  useEffect(() => {
    getCategory(setCategories, userId);
  }, []);

  const {
    isOpen: isOpenUpsert,
    onOpen: onOpenUpsert,
    onOpenChange: onOpenChangeUpsert,
    onClose,
  } = useDisclosure();

  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onOpenChange: onOpenChangeDelete,
  } = useDisclosure();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
    setValue,
    getValues,
  } = useForm<IExpenseData>({
    resolver: zodResolver(SUpsertExpense),
    mode: "onSubmit",
    defaultValues: {
      name: "",
      category: "",
      comment: "",
      date: getCurrentDate(),
      price: "",
      sub_category: "",
      page: 1,
      pageSize: 6,
      pageCount: 0,
      total: 0,
      id: "",
    },
  });

  useEffect(() => {
    const selectedCategory = getValues("category");
    if (selectedCategory) {
      getSubCategory(setSubCategory, selectedCategory, userId);
    }
  }, [getValues("category")]);

  useEffect(() => {
    getExpense(
      setExpenseList,
      getValues("page"),
      getValues("pageSize"),
      setValue
    );
  }, [getValues("page")]);

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = {
        ...getValues(),
        users_permissions_user: userId,
      };
      if (data.id) {
        await APutExpense({ data }, data.id);
      } else {
        await APostExpense({ data });
      }
      getExpense(setExpenseList, userId, getValues("pageSize"), setValue);
      resetForm();
      onClose();
    } catch (err) {
      console.error("Error in form submission:", err);
    }
  };

  const resetForm = () => {
    reset({
      id: "",
      name: "",
      category: "",
      comment: "",
      price: "",
      sub_category: "",
    });
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
    categories,
    setCategories,
    subCategory,
    setSubCategory,
    isOpenDelete,
    onOpenDelete,
    onOpenChangeDelete,
    selectedExpense,
    setSelectedExpense,
    setExpenseList,
  };
};
