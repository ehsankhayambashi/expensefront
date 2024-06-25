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
  id: string;
  name: string;
}

//////////////--SUB CATEGORY--///////////////
export interface ISubCategory {
  id: number;
  name: string;
  category: Category;
}

export interface Category {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// export interface Attributes {
//   name: string;
//   price: number;
//   comment: string;
//   createdAt: string;
//   updatedAt: string;
//   publishedAt: string;
//   date: string;
//   category: Category;
//   sub_categories: SubCategories;
//   users_permissions_user: UsersPermissionsUser;
// }

// export interface Category {
//   data: Data;
// }

// export interface Data {
//   id: number;
//   attributes: Attributes2;
// }

// export interface Attributes2 {
//   name: string;
//   createdAt: string;
//   updatedAt: string;
//   publishedAt: string;
// }

// export interface SubCategories {
//   data: Daum[];
// }

// export interface Daum {
//   id: number;
//   attributes: Attributes3;
// }

// export interface Attributes3 {
//   name: string;
//   createdAt: string;
//   updatedAt: string;
//   publishedAt: string;
// }

// export interface UsersPermissionsUser {
//   data: Data2;
// }

// export interface Data2 {
//   id: number;
//   attributes: Attributes4;
// }

// export interface Attributes4 {
//   username: string;
//   email: string;
//   provider: string;
//   confirmed: boolean;
//   blocked: boolean;
//   createdAt: string;
//   updatedAt: string;
// }

export interface IUpsertExpense {
  isOpenUpsert: boolean;
  onOpenChangeUpsert: (isOpen: boolean) => void;
  errors: FieldErrors<IExpenseData>;
  setValue: UseFormSetValue<IExpenseData>;
  getValues: UseFormGetValues<IExpenseData>;
  onSubmitForm: (e: React.FormEvent<HTMLFormElement>) => void;
  handleSubmit: UseFormHandleSubmit<IExpenseData, undefined>;
  category: ICategory[];
  subCategory: ISubCategory[];
}
export interface IUpsertCategory {
  isOpenUpsert: boolean;
  onOpenChangeUpsert: (isOpen: boolean) => void;
  errors: FieldErrors<ICategoryData>;
  setValue: UseFormSetValue<ICategoryData>;
  getValues: UseFormGetValues<ICategoryData>;
  onSubmitForm: (e: React.FormEvent<HTMLFormElement>) => void;
  handleSubmit: UseFormHandleSubmit<ICategoryData, undefined>;
  category: ICategory[];
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
