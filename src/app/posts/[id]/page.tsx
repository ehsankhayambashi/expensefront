import { Metadata } from "next";

type Props = {
  params: { id: string };
};

async function fetchPost(id: string) {
  const url = `https://jsonplaceholder.typicode.com/posts/${id}`;
  const post = await fetch(url).then((res) => res.json());
  return post;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await fetchPost(params.id);
  return {
    title: post.title,
    description: post.title,
  };
}

export default async function Page({ params }: Props) {
  const post = await fetchPost(params.id);
  return (
    <>
      <h1>{post.title}</h1>
      <div>{post.body}</div>
    </>
  );
}
