"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="flex justify-around items-center bg-white shadow-md py-4">
        <Link href="/dashboard" className="block hover:text-black text-red-600 text-lg font-semibold">
          User
        </Link>
        <div className="flex items-center">
          <Link href="/dashboard">
            <Image src="/logo.png" alt="CAAT Logo" width={225} height={225} className="cursor-pointer" />
          </Link>
        </div>
        <button className="text-red-600 font-semibold hover:underline">Explore</button>
      </header>

      {/* Progress Bar */}
      <div className="flex items-center justify-center bg-gray-200 py-8 px-6 space-x-4">
        <span className="text-red-600 font-medium">View Tasks</span>
        <div className="relative w-1/2 bg-gray-300 h-4 rounded-full">
          <div className="absolute top-0 left-0 h-4 bg-red-600 rounded-full" style={{ width: "50%" }}></div>
        </div>
        <span className="text-red-600 font-medium">50%</span>
      </div>

      {/* Sidebar and Content */}
      <div className="flex flex-grow">
        {/* Sidebar */}
        <aside className="bg-white w-1/4 p-6 shadow-md flex flex-col">
          <nav className="space-y-4 text-gray-700 ml-16">
            <Link href="/dashboard/profile" className="block hover:text-red-600">My Profile</Link>
            <Link href="/dashboard/colleges" className="block hover:text-red-600">Colleges</Link>
            <Link href="/dashboard/courses" className="block hover:text-red-600">Courses</Link>
            <Link href="/dashboard/essays" className="block hover:text-red-600">Essays</Link>
            <Link href="/dashboard/extracurriculars" className="block hover:text-red-600">Extracurriculars</Link>
            <Link href="/dashboard/scholarships" className="block hover:text-red-600">Scholarships</Link>
            <Link href="/dashboard/evaluate" className="block hover:text-red-600">Evaluate Application</Link>
            <Link href="/dashboard/chat" className="block hover:text-red-600">Chat CAAT</Link>
          </nav>
        </aside>

        {/* Dynamic Content */}
        <main className="flex-grow p-6">{children}</main>
      </div>
    </div>
  );
}
