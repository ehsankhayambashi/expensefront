import { LoginPage } from "@/feature/login";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "ورود",
};
const page = () => {
  return <LoginPage />;
};

export default page;
