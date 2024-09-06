"use client";
import React, { createContext, useContext, useMemo } from "react";
import { DecodeJwt } from "@/utils/DecodeJwt";

interface UserContextProps {
  userId: number;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const token = useMemo(() => localStorage.getItem("access"), []);
  const userId = useMemo(() => {
    if (token) {
      const payload = DecodeJwt(token);
      return Number(payload?.id);
    } else {
      return 0;
    }
  }, [token]);

  return (
    <UserContext.Provider value={{ userId }}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
