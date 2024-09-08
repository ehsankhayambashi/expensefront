// hooks/useAuth.ts
import { useEffect, useState } from "react";
import { fetchMe } from "@/utils/FetchMetadata";
import { AMe } from "../helper/api";
import { Logout } from "@/utils/Logout";
import FetchApi from "@/utils/FetchApi";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // State to track loading

  useEffect(() => {
    if (typeof window != "undefined") {
      const token = localStorage.getItem("access"); // Retrieve JWT from local storage or cookies
      if (!token) {
        setIsAuthenticated(false); // No token means user is not authenticated
        setLoading(false);
        return;
      }
    }

    const validateToken = async () => {
      try {
        setLoading(true);
        const response = await AMe();

        if (response.status === 200) {
          setIsAuthenticated(true); // Token is valid, user is authenticated
        } else {
          setIsAuthenticated(false); // Token is invalid or expired
          Logout();
        }
      } catch (error) {
        setIsAuthenticated(false); // Any error means the token is not valid
        Logout();
      } finally {
        setLoading(false); // Done checking
      }
    };

    validateToken();
  }, []);

  return { isAuthenticated, loading }; // Return authentication state and loading state
};
