// app/posts/[id]/page.tsx

import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Link,
} from "@nextui-org/react";
import { cookies } from "next/headers";
import Image from "next/image";
import React from "react";

// Function to fetch data for a specific post by ID
async function fetchPost(id: string): Promise<any> {
  const cookieStore = cookies();
  const token = cookieStore.get("access")?.value; // Get "access" cookie
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
  console.log(post);
  return (
    <Card className="m-4">
      <CardHeader>
        <h1 className="text-lg md:text-4xl md:p-8">
          {post.data.attributes.title}
        </h1>
      </CardHeader>
      <CardBody className="text-right md:px-16">
        <Image
          width={270}
          height={270}
          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${post.data.attributes.image.data.attributes.url}`}
          className="w-full md:h-80 object-cover pb-4"
          alt={post.data.attributes.image.data.attributes.alternativeText}
        />
        <div>
          {post.data.attributes.body
            .split("\n")
            .map((line: string, index: number) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
        </div>
      </CardBody>
      <CardFooter>
        <Link color="primary" className="leading-8 md:px-12" href="/expense">
          همین الان از جیب‌سنج برای مدیریت هزینه ها استفاده کنید
        </Link>
      </CardFooter>
    </Card>
  );
}

// Function to generate static parameters for dynamic routes
export async function generateStaticParams() {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts?populate=*`; // Adjusted to fetch all posts
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // No Authorization header here
    },
    next: { revalidate: 10 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  const data = await res.json();

  // Assuming the response structure includes an array of posts
  const posts: { id: number }[] = data.data; // Adjust based on the actual response structure

  // Return an array of objects with the `id` parameter for each post
  return posts.map((post) => ({
    id: post.id.toString(), // Ensure the `id` is a string
  }));
}
