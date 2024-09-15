"use client";
import React from "react";
import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Skeleton,
} from "@nextui-org/react";
import { useAuth } from "@/feature/login/hooks/useAuth";
import { Logout } from "@/utils/Logout";
const MyNavbar = () => {
  let menuItems = [
    { label: "مدیریت هزینه", path: "/expense" },
    { label: "گزارش", path: "/reports" },
    { label: "وبلاگ", path: "/posts" },
    { label: "ورود", path: "/login" },
    { label: "ثبت نام", path: "/register" },
    { label: "خروج", path: "/login" },
  ];
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return (
      <div className="w-full flex items-center">
        <Skeleton className="flex w-full h-8 rounded-lg m-1" />
      </div>
    );
  }

  menuItems = menuItems.filter((item) =>
    isAuthenticated ? item.label != "ورود" && item.label != "ثبت نام" : item
  );

  return (
    <Navbar disableAnimation isBordered>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent className="sm:hidden" justify="center">
        <Link color="foreground" href="/">
          <NavbarBrand>
            💸
            <p className="font-bold text-inherit">جیب‌سنج</p>
          </NavbarBrand>
        </Link>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <Link
          className="border border-blue-400 rounded-lg p-1"
          color="foreground"
          href="/"
        >
          <NavbarBrand>
            💸
            <p className="font-bold text-blue-400">جیب‌سنج</p>
          </NavbarBrand>
        </Link>
        {isAuthenticated && (
          <NavbarItem isActive>
            <Link href="/expense" aria-current="page" color="foreground">
              مدیریت هزینه ها
            </Link>
          </NavbarItem>
        )}
        {isAuthenticated && (
          <NavbarItem isActive>
            <Link color="foreground" href="/reports">
              گزارش
            </Link>
          </NavbarItem>
        )}
        <NavbarItem isActive>
          <Link href="/posts" aria-current="page" color="foreground">
            وبلاگ
          </Link>
        </NavbarItem>
      </NavbarContent>

      {!isAuthenticated ? (
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link href="/login">ورود</Link>
          </NavbarItem>
          <NavbarItem className="hidden lg:flex">
            <Button as={Link} color="warning" href="/register" variant="flat">
              ثبت نام
            </Button>
          </NavbarItem>
        </NavbarContent>
      ) : (
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Button
              as={Link}
              color="danger"
              href="/login"
              variant="flat"
              onClick={Logout}
            >
              خروج
            </Button>
          </NavbarItem>
        </NavbarContent>
      )}

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color="foreground"
              href={item?.path}
              size="lg"
              onClick={() => {
                if (item.label === "خروج") {
                  if (typeof window != "undefined") {
                    window.localStorage.clear();
                  }
                }
              }}
            >
              {item?.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default MyNavbar;
