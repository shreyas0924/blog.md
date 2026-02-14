/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);
    try {
      const { error } = await authClient.signIn.email(
        {
          email: username,
          password,
          callbackURL: "/admin",
          rememberMe: rememberMe,
        },
      );

      if (error) {
        setErrorMsg(error.message ?? "Sign in failed");
        setLoading(false);
        return;
      }
    } catch (err: any) {
      setErrorMsg(err?.message ?? "Unexpected error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
        <header className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-gray-900">Sign In</h1>
          <p className="text-sm text-gray-500 mt-1">
            Welcome back — please sign in to your account
          </p>
        </header>

        <form className="space-y-4" onSubmit={handleSignIn}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={username}
              onChange={(c) => setUsername(c.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={password}
              onChange={(c) => setPassword(c.target.value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-600">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2">Remember me</span>
            </label>
            {/* <a href="#" className="text-sm text-indigo-600 hover:underline">
              Forgot?
            </a> */}
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
          {errorMsg && <p className="text-sm text-red-600 mt-2">{errorMsg}</p>}
        </form>
      </div>
    </div>
  );
}
