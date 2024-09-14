import { Expense } from "@/feature/expense";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "مدیریت هزینه",
};
const page = () => {
  return <Expense />;
};

export default page;
