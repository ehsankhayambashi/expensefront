import FetchApi, { TResponse } from "@/utils/FetchApi";

export const APostReport = async (
  body: any,
  userId: any
): Promise<TResponse<any>> => {
  return FetchApi.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/expense/chart/${userId}`,
    body
  );
};
