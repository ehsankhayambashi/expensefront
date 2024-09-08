"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { DecodeJwt } from "@/utils/DecodeJwt";

interface UserContextProps {
  userId: number;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState<number>(0);

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) {
      const payload = DecodeJwt(token);
      setUserId(Number(payload?.id));
    }
  }, []);

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
