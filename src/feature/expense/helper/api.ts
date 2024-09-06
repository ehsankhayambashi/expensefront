import FetchApi, { TResponse } from "@/utils/FetchApi";

export const AGetExpense = async (
  page: number,
  pageSize: number
): Promise<TResponse<any>> => {
  return FetchApi.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/expense/getAll/${page}/${pageSize}`
  );
};

export const APostExpense = async (body: any): Promise<TResponse<any>> => {
  return FetchApi.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/expenses`,
    body
  );
};
export const APutExpense = async (
  body: any,
  id: string
): Promise<TResponse<any>> => {
  return FetchApi.put(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/expenses/${id}`,
    body
  );
};
export const ADeleteExpense = async (id: string): Promise<TResponse<any>> => {
  return FetchApi.delete(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/expenses/${id}`
  );
};
export const AGetCategories = async (
  userId: number
): Promise<TResponse<any>> => {
  return FetchApi.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories?populate=*&filters[users_permissions_user][id][$eq]=${userId}&sort[0]=createdAt:desc`
  );
};
export const APostCategory = async (body: any): Promise<TResponse<any>> => {
  return FetchApi.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`,
    body
  );
};
export const APostSubCategory = async (body: any): Promise<TResponse<any>> => {
  return FetchApi.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/sub-categories`,
    body
  );
};
export const AGetSubCategories = async (
  categoryId: string,
  userId: number
): Promise<TResponse<any>> => {
  return FetchApi.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/sub-categories?populate=*&filters[users_permissions_user][id][$eq]=${userId}&filters[category][id][$eq]=${categoryId}&sort[0]=createdAt:desc`
  );
};
