"use client";
import React from 'react';
import Image from "next/image";

export default function LoginPage() {
  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Logging in...');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-mainCustomColor p-6 rounded shadow-md w-full max-w-md">
        {/* Logo Section */}
        <div className="flex justify-center mb-4">
          <Image
            src="/logo.jpeg"
            alt="Logo"
            width={100}
            height={100}
            className="rounded animate-bounce"
          />
        </div>
        <h1 className="text-2xl font-bold text-center mb-4 text-white">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm mt-4 text-white">
          Don’t have an account?{' '}
          <a href="/auth/register" className="text-blue-500 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
