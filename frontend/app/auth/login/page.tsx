"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    // Extract form data
    const form = event.target as HTMLFormElement;
    const email = form.email.value;
    const password = form.password.value;

    try {
      // Send login data to backend
      const response = await fetch("https://caat-projectapp.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json(); // Parse JSON response

      // Save token in localStorage or sessionStorage
      localStorage.setItem("token", data.token);

      // Show success message and redirect
      setMessage("Login successful!");
      setError(null);
      setTimeout(() => {
        router.push("/dashboard"); // Redirect to dashboard
      }, 2000);
    } catch (err) {
      console.error("Error:", err);

      setMessage(null); // Clear success message
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
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
          {message && <p className="text-center text-sm text-green-700 mb-4">{message}</p>}
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
            >
              Login
            </button>
          </form>

          <p className="text-center text-sm mt-4 text-white">
            Don’t have an account?{" "}
            <a href="/auth/register" className="text-black hover:underline">Register</a>
          </p>
        </div>
      </div>
    </div>
  );
}
