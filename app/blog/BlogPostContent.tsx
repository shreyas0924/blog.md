/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { format } from "date-fns";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import "highlight.js/styles/github.css";

function getReadingTime(text: string) {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

const components: Components = {
  h1: ({ children }) => (
    <h1 className="mt-10 mb-4 text-3xl font-semibold tracking-tight  pb-2 first:mt-0">
      {children}
    </h1>
  ),

  h2: ({ children }) => (
    <h2 className="mt-10 mb-3 text-2xl font-semibold tracking-tight  pb-1">
      {children}
    </h2>
  ),

  h3: ({ children }) => (
    <h3 className="mt-8 mb-2 text-xl font-semibold">{children}</h3>
  ),

  p: ({ children }) => (
    <p className="my-4 leading-7 text-muted-foreground">{children}</p>
  ),

  strong: ({ children }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),

  em: ({ children }) => (
    <em className="italic text-foreground/80">{children}</em>
  ),

  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-blue-600 dark:text-blue-400 underline underline-offset-2 hover:opacity-80 transition"
    >
      {children}
    </a>
  ),

  ul: ({ children }) => (
    <ul className="my-4 ml-6 list-disc space-y-1.5">{children}</ul>
  ),

  ol: ({ children }) => (
    <ol className="my-4 ml-6 list-decimal space-y-1.5">{children}</ol>
  ),

  li: ({ children }) => (
    <li className="leading-7 text-muted-foreground">{children}</li>
  ),

  blockquote: ({ children }) => (
    <blockquote className="my-6 border-l-4 border-muted-foreground/30 pl-4 italic text-muted-foreground">
      {children}
    </blockquote>
  ),

  hr: () => <hr className="my-8 border-border" />,

  pre: ({ children }) => {
    const [copied, setCopied] = useState(false);

    const child = Array.isArray(children) ? children[0] : children;

    function extractText(node: any): string {
      if (typeof node === "string") return node;

      if (Array.isArray(node)) {
        return node.map(extractText).join("");
      }

      if (node && typeof node === "object" && "props" in node) {
        return extractText(node.props.children);
      }

      return "";
    }

    const code = extractText(child);

    const language =
      typeof child === "object" &&
      child !== null &&
      "props" in child &&
      typeof child.props.className === "string"
        ? child.props.className
            .split(" ")
            .find((cls: string) => cls.startsWith("language-"))
            ?.replace("language-", "") || "code"
        : "code";

    const handleCopy = async () => {
      if (!code) return;
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 1500);
    };

    return (
      <div className="relative my-6 group">
        <div className="flex items-center justify-between px-4 py-2 text-xs font-mono text-muted-foreground bg-muted/60 border border-b-0 rounded-t-xl">
          <span>{language.toUpperCase()}</span>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1 opacity-70 hover:opacity-100 transition border p-1 rounded-lg"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                Copy
              </>
            )}
          </button>
        </div>

        <pre className="overflow-x-auto rounded-b-xl border border-t-0 bg-muted/40 px-5 py-4 text-sm font-mono leading-relaxed">
          {children}
        </pre>
      </div>
    );
  },
  code: ({ children, className }) => {
    const isBlock = className?.includes("language-");

    if (isBlock) {
      return <code className="font-mono">{children}</code>;
    }

    return (
      <code className="rounded-md bg-gray-500 text-white dark:bg-gray-400 px-1.5 py-0.5 font-mono text-sm dark:text-black">
        {children}
      </code>
    );
  },

  table: ({ children }) => (
    <div className="my-6 overflow-x-auto rounded-lg border">
      <table className="w-full text-sm">{children}</table>
    </div>
  ),

  thead: ({ children }) => (
    <thead className="bg-muted text-muted-foreground">{children}</thead>
  ),

  tbody: ({ children }) => (
    <tbody className="divide-y divide-border">{children}</tbody>
  ),

  tr: ({ children }) => <tr className="divide-x divide-border">{children}</tr>,

  th: ({ children }) => (
    <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wide">
      {children}
    </th>
  ),

  td: ({ children }) => (
    <td className="px-4 py-2 text-muted-foreground">{children}</td>
  ),
};

export default function BlogPostClient({ post }: { post: any }) {
  const readingTime = getReadingTime(post.content);

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-3xl mx-auto px-6"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between mt-6 mb-6 text-xs text-muted-foreground font-mono">
        <Link
          href="/"
          className="flex items-center gap-1 hover:text-foreground transition"
        >
          <ArrowLeft size={14} />
          back
        </Link>

        <span>{readingTime}</span>
      </div>

      {/* Header */}
      <header className="mb-12 border-b border-border pb-8">
        <h1 className="font-serif text-3xl font-bold tracking-tight">
          {post.title}
        </h1>

        <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground font-mono">
          <time>{format(new Date(post.date), "MMMM d, yyyy")}</time>
          <span>·</span>
          <span>{readingTime}</span>

          {post.tags?.length > 0 && (
            <>
              <span>·</span>
              <span>{post.tags.join(", ")}</span>
            </>
          )}
        </div>

        {post.description && (
          <p className="mt-4 text-muted-foreground italic leading-relaxed">
            {post.description}
          </p>
        )}
      </header>

      {/* Markdown */}
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={components}
      >
        {post.content}
      </ReactMarkdown>
    </motion.article>
  );
}
