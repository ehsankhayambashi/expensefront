// components/WithAuth1.tsx
import React from "react";
import { useAuth } from "@/feature/login/hooks/useAuth";
import { useRouter } from "next/navigation";

const WithAuth1 = (WrappedComponent: React.ComponentType) => {
  const AuthWrapper: React.FC<any> = (props) => {
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

  // Assign a display name to the inner component
  AuthWrapper.displayName = `WithAuth1(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return AuthWrapper;
};

WithAuth1.displayName = "WithAuth1";
export default WithAuth1;
