"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className=" w-full border-b mx-auto pb-4 border-neutral-200 sm:w-5/6 dark:border-neutral-700 pt-5"
      aria-label="Main navigation"
    >
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="font-serif font-bold text-base tracking-tight text-neutral-900 dark:text-neutral-100"
          >
            shreyas&apos; blogs
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/blog"
            className="text-sm text-neutral-700 dark:text-neutral-300 hover:underline"
          >
            All posts
          </Link>
          <Link
            href="/about"
            className="text-sm text-neutral-700 dark:text-neutral-300 hover:underline"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-sm text-neutral-700 dark:text-neutral-300 hover:underline"
          >
            Contact
          </Link>
          <ThemeToggle />
        </div>

        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {open ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-neutral-900 dark:text-neutral-100"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-neutral-900 dark:text-neutral-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden max-w-180 mt-2 flex flex-col gap-3 pb-4">
          <Link
            href="/blog"
            className="text-sm underline text-neutral-700 dark:text-neutral-300"
          >
            All posts
          </Link>
          <Link
            href="/about"
            className="text-sm underline text-neutral-700 dark:text-neutral-300"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-sm underline text-neutral-700 dark:text-neutral-300"
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}
