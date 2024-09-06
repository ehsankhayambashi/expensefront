// components/withAuth.tsx
import React from "react";
import { useAuth } from "@/feature/login/hooks/useAuth";
import { useRouter } from "next/navigation";

const withAuth = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();

    if (loading) {
      // Show a loading indicator while checking auth state
      return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
      // Redirect to login page if not authenticated
      router.push("/login");
      return null; // Prevent the component from rendering
    }

    // Render the component if authenticated
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
