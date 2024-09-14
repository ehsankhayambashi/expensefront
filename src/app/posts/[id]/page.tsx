// app/posts/[id]/page.tsx

import { cookies } from "next/headers";

// interface Post {
//   id: number;
//   title: string;
//   body: string;
// }

// Function to fetch data for a specific post by ID
async function fetchPost(id: string): Promise<any> {
  const cookieStore = cookies();
  const token = cookieStore.get("access")?.value; // دریافت کوکی "access"
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts/${id}?populate=*`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    next: { revalidate: 10 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch post");
  }

  return res.json();
}

// The dynamic page component that renders a single post
interface PostPageProps {
  params: { id: string }; // `params` contains the dynamic route parameter
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await fetchPost(params.id); // Fetch post data using the route parameter
  console.log(post)
  return (
    <div>
      <h1>{post.attributes.title}</h1>
      <p>{post.body}</p>
    </div>
  );
}

// Function to generate static parameters for dynamic routes
export async function generateStaticParams() {
  const cookieStore = cookies();
  const token = cookieStore.get("access")?.value; // دریافت کوکی "access"
  const url1 = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts/${id}?populate=*`;
  const res = await fetch(url1, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    next: { revalidate: 10 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  const posts: { id: number }[] = await res.json();

  // Return an array of objects with the `id` parameter for each post
  return posts.map((post) => ({
    id: post.id.toString(), // Ensure the `id` is a string
  }));
}
