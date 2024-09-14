// app/posts/page.tsx

import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { cookies } from "next/headers";
import Link from "next/link";
import Image from 'next/image';

// Fetch the posts data on the server with cache control for SSG
async function fetchPosts() {
  const cookieStore = cookies();
  const token = cookieStore.get("access")?.value; // دریافت کوکی "access"
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts?populate=*`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    next: { revalidate: 10 },
  });

  // Handle non-OK response
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  // Revalidate every 10 seconds (ISR)
  return res.json();
}

export default async function Page() {
  const { data } = await fetchPosts();
  return (
    <div className="p-2">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
        {data?.map((post: any) => (
          <Link key={post.id} href={`/posts/${post.id}`}>
            <Card className="py-4">
              <CardHeader className="flex items-center justify-center">
                <h4 className="font-bold text-sm">{post.attributes.title}</h4>
              </CardHeader>
              <CardBody className="flex items-center justify-center overflow-visible py-2">
                <Image
                  alt={post.attributes.image.data.attributes.alternativeText}
                  className="object-cover rounded-xl"
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${post.attributes.image.data.attributes.url}`}
                  width={270}
                  height={270}
                  layout="responsive" // or "responsive" depending on your layout needs
                />
              </CardBody>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
