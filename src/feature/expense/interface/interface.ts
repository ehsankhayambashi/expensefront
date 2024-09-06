import {
  FieldErrors,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormSetValue,
} from "react-hook-form";

export interface IExpense {
  id: number;
  name: string;
  price: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  date: string;
  category: Category;
  sub_category: SubCategory;
}

export interface Category {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface SubCategory {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Meta {
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

//////////////--CATEGORY--///////////////
export interface ICategory {
  id: number;
  name: string;
}
export interface ICategoryData {
  name: string;
}

//////////////--SUB CATEGORY--///////////////
export interface ISubCategory {
  id: number;
  name: string;
  category: string;
}

export interface Category {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface IUpsertExpense {
  isOpenUpsert: boolean;
  onOpenChangeUpsert: (isOpen: boolean) => void;
  errors: FieldErrors<IExpenseData>;
  setValue: UseFormSetValue<IExpenseData>;
  getValues: UseFormGetValues<IExpenseData>;
  onSubmitForm: (e: React.FormEvent<HTMLFormElement>) => void;
  handleSubmit: UseFormHandleSubmit<IExpenseData, undefined>;
  categories: ICategory[];
  subCategory: ISubCategory[];
  setCategories: Function;
  setSubCategory: Function;
}
export interface IUpsertCategory {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  errors: FieldErrors<ICategoryData>;
  setValue: UseFormSetValue<ICategoryData>;
  getValues: UseFormGetValues<ICategoryData>;
  onSubmitForm: (e: React.FormEvent<HTMLFormElement>) => void;
  handleSubmit: UseFormHandleSubmit<ICategoryData, undefined>;
}
export interface IUpsertSubCategory {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  errors: FieldErrors<ISubCategory>;
  setValue: UseFormSetValue<ISubCategory>;
  getValues: UseFormGetValues<ISubCategory>;
  onSubmitForm: (e: React.FormEvent<HTMLFormElement>) => void;
  handleSubmit: UseFormHandleSubmit<ISubCategory, undefined>;
  categories: ICategory[];
}

export interface IDeleteExpense {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  page: number;
  pageSize: number;
  setValue: UseFormSetValue<IExpenseData>;
  selectedExpense: IExpense | undefined;
  setExpense: Function;
}
export interface IExpenseData {
  id: string;
  price: string;
  category: string;
  sub_category: string;
  name: string;
  comment: string;
  date: string;
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}
