import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/context/UserContext";
import { fetchMetadata } from "@/utils/FetchMetadata";
import { Toaster } from "react-hot-toast";

import { BiLogOut } from "react-icons/bi";
import MyNavbar from "@/components/Navbar/Navbar";

export async function generateMetadata(): Promise<Metadata> {
  const res = await fetchMetadata();
  const { title, description, author } = res?.data?.attributes;
  return {
    title,
    description,
    authors: [{ name: author }],
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className=" font-IranYekanNumber" dir="rtl" lang="en">
      <body>
        <MyNavbar />
        <UserProvider>{children}</UserProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
