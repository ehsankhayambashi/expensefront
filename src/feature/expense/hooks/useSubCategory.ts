import { useDisclosure } from "@nextui-org/react";
import { useForm, UseFormSetValue } from "react-hook-form";
import { IExpenseData, ISubCategory } from "../interface/interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { SUpsertSubCategory } from "../interface/schema";
import { APostSubCategory } from "../helper/api";
import { useEffect } from "react";
import { getSubCategory } from "../helper/controller";
import { useUser } from "@/context/UserContext";

export const useSubCategory = (
  setValue: UseFormSetValue<IExpenseData>,
  setSubCategory: Function
) => {
  const {
    isOpen: isOpenSubCat,
    onOpen: onOpenSubCat,
    onOpenChange: onOpenChangeSubCat,
    onClose,
  } = useDisclosure();
  const { userId } = useUser();
  const {
    register,
    handleSubmit: handleSubmitSubCat,
    formState: { errors: errorsSubCat, isSubmitting },
    reset,
    control,
    setValue: setValueSubCat,
    getValues: getValuesSubCat,
  } = useForm<ISubCategory>({
    resolver: zodResolver(SUpsertSubCategory),
    mode: "onSubmit",
    values: {
      name: "",
      category: "",
      id: 0,
    },
  });

  useEffect(() => {
    if (!isOpenSubCat && getValuesSubCat("category") != "") {
      getSubCategory(setSubCategory, getValuesSubCat("category"), userId);
    }
  }, [isOpenSubCat]);

  const onSubmitFormSubCat = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = {
        data: {
          ...getValuesSubCat(),
          category: getValuesSubCat("category"),
          users_permissions_user: userId,
        },
      };
      APostSubCategory(data)
        .then((res) => {
          setValue("sub_category", String(res.data.data.id), {
            shouldValidate: true,
          });
          onClose();
        })
        .catch((err) => {});
    } catch (err) {}
  };
  return {
    isOpenSubCat,
    onOpenSubCat,
    onOpenChangeSubCat,
    setValueSubCat,
    getValuesSubCat,
    errorsSubCat,
    handleSubmitSubCat,
    onSubmitFormSubCat,
  };
};
