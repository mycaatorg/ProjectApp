"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/loadingSpinner";


export default function LoginPage() {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // NEW

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    // Extract form data
    const form = event.target as HTMLFormElement;
    const email = form.email.value;
    const password = form.password.value;

    // ⏳ Set a timeout to show "Waking up" message if backend is slow
    const wakeTimeout = setTimeout(() => {
      setMessage("Waking up server... Please hang tight.");
    }, 2000);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      clearTimeout(wakeTimeout); // Cancel timeout when we get a response

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();

      localStorage.setItem("token", data.token);

      setMessage("Login successful!");
      setError(null);
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (err) {
      clearTimeout(wakeTimeout);
      setMessage(null);
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center w-full">
        {/* Logo Section */}
        <div className="mb-6">
          <Image src="/logo.png" alt="CAAT Logo" width={300} height={300} />
        </div>

        {/* Login Form */}
        <div className="bg-red-500 p-6 rounded-md shadow-lg w-full max-w-md">
          <h1 className="text-center text-2xl font-semibold text-white mb-4">Login</h1>

          {/* Display Success or Error Messages */}
          {message && <p className="text-center text-sm text-yellow-100 mb-4">{message}</p>}
          {error && <p className="text-center text-sm text-red-700 mb-4">{error}</p>}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm text-white">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm text-white">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          {loading && <LoadingSpinner text="Waking up server..." />}
          
          <p className="text-center text-sm mt-4 text-white">
            Don’t have an account?{" "}
            <a href="/auth/register" className="text-black hover:underline">Register</a>
          </p>
        </div>
      </div>
    </div>
  );
}
