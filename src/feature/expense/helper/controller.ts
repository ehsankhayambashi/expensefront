import num2persian from "num2persian";
import { UseFormSetValue } from "react-hook-form";
import { IExpenseData } from "../interface/interface";
import {
  ADeleteExpense,
  AGetCategories,
  AGetExpense,
  AGetSubCategories,
  APutExpense,
} from "./api";
import { Logout } from "@/utils/Logout";

export const getExpense = (
  setExpense: Function,
  page: number,
  pageSize: number,
  setValue: UseFormSetValue<IExpenseData>
) => {
  AGetExpense(page, pageSize)
    .then((json: any) => {
      setValue("total", json.data.meta.pagination.total, {
        shouldValidate: true,
      });
      setValue("pageCount", json.data.meta.pagination.pageCount, {
        shouldValidate: true,
      });
      setExpense(json.data.data);
    })
    .catch((err) => {
      if (err.status == 401) {
        Logout();
      }
    });
};
export const putExpense = (
  setExpense: Function,
  page: number,
  pageSize: number,
  setValue: UseFormSetValue<IExpenseData>,
  body: any,
  id: string
) => {
  APutExpense(body, id)
    .then((json: any) => {
      getExpense(setExpense, page, pageSize, setValue);
    })
    .catch((err) => {
      if (err.status == 401) {
        Logout();
      }
    });
};
export const deleteExpense = (
  setExpense: Function,
  page: number,
  pageSize: number,
  setValue: UseFormSetValue<IExpenseData>,
  id: string
) => {
  ADeleteExpense(id)
    .then((json: any) => {
      getExpense(setExpense, page, pageSize, setValue);
    })
    .catch((err) => {
      if (err.status == 401) {
        Logout();
      }
    });
};
export const getCategory = (setCategory: Function, userId: number) => {
  if (userId != undefined) {
    AGetCategories(userId)
      .then((json: any) => {
        setCategory(
          json.data.data.map((item: any) => {
            return {
              id: item.id,
              name: item.attributes.name,
            };
          })
        );
      })
      .catch((err) => {
        if (err.status == 401) {
          Logout();
        }
      });
  }
};

export const getSubCategory = (
  setSubCategory: Function,
  categoryId: string,
  userId: number
) => {
  if (userId != undefined) {
    AGetSubCategories(categoryId, userId)
      .then((json: any) => {
        setSubCategory(
          json.data.data.map((item: any) => {
            return {
              id: item.id,
              name: item.attributes.name,
            };
          })
        );
      })
      .catch((err) => {
        if (err.status == 401) {
          Logout();
        }
      });
  }
};

export const convertNumberToWords = (number: number): string => {
  return `${num2persian(number)} تومان`;
};
export const getCurrentDate = () => {
  return new Date().toISOString().slice(0, 10);
};
