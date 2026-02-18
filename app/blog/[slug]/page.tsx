import { getPost, getAllSlugs } from "@/lib/posts";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.description };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  return (
    <article>
      {/* Back link */}
      <Link
        href="/"
        className="back-link"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.4rem",
          color: "var(--muted)",
          textDecoration: "none",
          fontSize: "0.85rem",
          fontFamily: '"JetBrains Mono", monospace',
          marginBottom: "2.5rem",
          transition: "color 0.15s",
        }}
      >
        <ArrowLeft size={14} />
        back
      </Link>

      {/* Header */}
      <header style={{ marginBottom: "2.5rem" }}>
        <h1
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "2rem",
            fontWeight: "700",
            lineHeight: "1.25",
            color: "var(--fg)",
            marginBottom: "0.75rem",
            letterSpacing: "-0.02em",
          }}
        >
          {post.title}
        </h1>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            color: "var(--muted)",
            fontSize: "0.825rem",
            fontFamily: '"JetBrains Mono", monospace',
          }}
        >
          <time dateTime={post.date}>
            {format(new Date(post.date), "MMMM d, yyyy")}
          </time>
          {post.tags && post.tags.length > 0 && (
            <>
              <span>·</span>
              <span>{post.tags.join(", ")}</span>
            </>
          )}
        </div>

        {post.description && (
          <p
            style={{
              marginTop: "1rem",
              color: "var(--muted)",
              fontStyle: "italic",
              fontSize: "1rem",
              lineHeight: "1.6",
            }}
          >
            {post.description}
          </p>
        )}

        <div
          style={{
            marginTop: "2rem",
            borderTop: "1px solid var(--border)",
          }}
        />
      </header>

      {/* Content */}
      <div className="prose">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]}>
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}
