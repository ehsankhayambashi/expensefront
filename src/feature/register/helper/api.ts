import FetchApi, { TResponse } from "@/utils/FetchApi";

export const APostUser = async (body: any): Promise<TResponse<any>> => {
  return FetchApi.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/local/register`,
    body
  );
};
