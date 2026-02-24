"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { format } from "date-fns";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function HomeClient({ posts }: { posts: any[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-3xl mx-auto md:px-6"
    >
      <ul className="list-disc pl-5 my-6">
        {posts.map((post, i) => (
          <motion.li
            key={post.slug}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="py-2 my-4"
          >
            <Link
              href={`/blog/${post.slug}`}
              className="flex justify-between group"
            >
              <span className="font-serif font-semibold group-hover:opacity-70 transition">
                {post.title}
              </span>

              <span className="text-xs font-mono pt-1">
                {format(new Date(post.date), "MMM d, yyyy")}
              </span>
            </Link>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
