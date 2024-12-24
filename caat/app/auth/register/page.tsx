"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
        const router = useRouter();

        const handleRegister = (event: React.FormEvent) => {
                event.preventDefault(); // Prevent the default form submission
                console.log("Navigating to setup page...");

                // Navigate to setup page
                router.push("/auth/setup");
        };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center w-full">
        {/* Logo Section */}
        <div className="mb-6">
          <Image src="/logo.png" alt="CAAT Logo" width={300} height={300} />
        </div>

        {/* Login Form */}
        <div className="bg-red-500 p-6 rounded-md shadow-lg w-full max-w-md ">
          <h1 className="text-center text-2xl font-semibold text-white mb-4">
            Register
          </h1>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm text-white">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm text-white">
                Password
              </label>
              <input
                type="password"
                id="password"
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
            Already hve an account?{" "}
            <a href="/auth/login" className="text-black hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
