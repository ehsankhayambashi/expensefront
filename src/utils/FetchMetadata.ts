export async function fetchMetadata() {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/meta?populate=*`;
  const res = await fetch(url).then((res) => res.json());
  return res;
}

export async function fetchData(endpoint: string) {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}${endpoint}`;
  const res = await fetch(url).then((res) => res.json());
  return res;
}

// utils/fetchData.ts
export async function fetchMe() {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/me`;

  // Retrieve the JWT token from local storage or cookies
  if (typeof window != "undefined") {
    const token = localStorage.getItem("access"); // Adjust this if you use cookies
    try {
      const res = await fetch(url, {
        method: "GET", // Set method to GET or adjust based on your requirements
        headers: {
          "Content-Type": "application/json", // Specify content type
          Authorization: token ? `Bearer ${token}` : "", // Include JWT in Authorization header
        },
      });

      if (!res.ok) {
        // Handle non-200 responses
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      return await res.json(); // Parse and return JSON response
    } catch (error) {
      console.error("Failed to fetch data:", error);
      throw error; // Rethrow error to be handled by caller
    }
  }
}
