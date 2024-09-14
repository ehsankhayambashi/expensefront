import { ReportsPage } from "@/feature/reports";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "گزارش",
};
const page = () => {
  return <ReportsPage />;
};

export default page;
