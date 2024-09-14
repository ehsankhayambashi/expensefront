import { RegisterPage } from "@/feature/register";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ثبت نام",
};
const page = () => {
  return <RegisterPage />;
};
export default page;
