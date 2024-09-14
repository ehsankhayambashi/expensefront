import { UserProvider } from "@/context/UserContext";
import { Toaster } from "react-hot-toast";
import "./globals.css";

import MyNavbar from "@/components/Navbar/Navbar";
import { fetchMetadata } from "@/utils/FetchMetadata";
import { Metadata } from "next";
import { NextUIProvider } from "@nextui-org/react";

export async function generateMetadata(): Promise<Metadata> {
  const res = await fetchMetadata();
  const { title, description, author } = res?.data?.attributes;
  return {
    title: {
      template: `%s | ${title}`,
      default: `${title}  مدیریت هزینه ها`, // a default is required when creating a template
    },
    description,
    authors: [{ name: author }],
    twitter: {
      card: "summary_large_image",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className=" font-IranYekanNumber" dir="rtl" lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=no"
        />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body>
        <MyNavbar />
        <UserProvider>{children}</UserProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
