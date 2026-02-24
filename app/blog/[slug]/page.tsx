import { getPost, getAllSlugs } from "@/lib/posts";
import { notFound } from "next/navigation";
import BlogPostClient from "../BlogPostContent";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return <BlogPostClient post={post} />;
}
