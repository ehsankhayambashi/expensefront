import FetchApi, { TResponse } from "@/utils/FetchApi";

export const APostLogin = async (body: any): Promise<TResponse<any>> => {
  return FetchApi.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/local`,
    body
  );
};
export const AMe = async (): Promise<TResponse<any>> => {
  return FetchApi.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/me`);
};
