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
export const AGetCategories = async (): Promise<TResponse<any>> => {
  return FetchApi.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/category/getAll/`
  );
};
export const AGetSubCategories = async (
  categoryId: string
): Promise<TResponse<any>> => {
  return FetchApi.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/sub-category/getAll/${categoryId}`
  );
};
