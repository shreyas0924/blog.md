import { getAllPosts } from "@/lib/posts";
import Link from "next/link";
import { format } from "date-fns";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div>
      {posts.length === 0 ? (
        <div style={{ color: "var(--muted)", paddingTop: "2rem" }}>
          <p style={{ marginBottom: "0.5rem" }}>No posts yet.</p>
          <p style={{ fontSize: "0.9rem" }}>
            Add{" "}
            <code style={{ fontFamily: "monospace", fontSize: "0.85em" }}>
              .md
            </code>{" "}
            files to the{" "}
            <code style={{ fontFamily: "monospace", fontSize: "0.85em" }}>
              blogs/
            </code>{" "}
            directory to get started.
          </p>
        </div>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {posts.map((post, i) => (
            <li
              key={post.slug}
              style={{
                borderTop: i === 0 ? "1px solid var(--border)" : "none",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <Link
                href={`/blog/${post.slug}`}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  gap: "2rem",
                  padding: "1.1rem 0",
                  textDecoration: "none",
                  color: "var(--fg)",
                  opacity: 1,
                }}
                className="post-link"
              >
                <span
                  style={{ fontFamily: "Georgia, serif", fontSize: "1rem" }}
                >
                  {post.title}
                </span>
                <span
                  style={{
                    color: "var(--muted)",
                    fontSize: "0.8rem",
                    fontFamily: '"JetBrains Mono", monospace',
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                  }}
                >
                  {format(new Date(post.date), "MMM d, yyyy")}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
