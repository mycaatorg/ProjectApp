"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      const data = await response.json();

      // 🔐 Store token and (optionally) user data
      localStorage.removeItem("token");
      localStorage.setItem("token", data.token);

      // Optional: store user info
      // localStorage.setItem("user", JSON.stringify(data.user));

      // Show success message and navigate
      setMessage("Registration successful!");
      setError(null);
      setTimeout(() => {
        router.push("/auth/setup"); // or "/dashboard"
      }, 2000);
    } catch (err) {
      console.error("Error:", err);
      setMessage(null);
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center w-full">
        {/* Logo */}
        <div className="mb-6">
          <Image src="/logo.png" alt="CAAT Logo" width={300} height={300} />
        </div>

        {/* Register Form */}
        <div className="bg-red-500 p-6 rounded-md shadow-lg w-full max-w-md">
          <h1 className="text-center text-2xl font-semibold text-white mb-4">Register</h1>

          {message && <p className="text-center text-sm text-green-700 mb-4">{message}</p>}
          {error && <p className="text-center text-sm text-red-700 mb-4">{error}</p>}

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label htmlFor="firstName" className="block text-sm text-white">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm text-white">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
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
              Register
            </button>
          </form>

          <p className="text-center text-sm mt-4 text-white">
            Already have an account?{" "}
            <a href="/auth/login" className="text-black hover:underline">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}
