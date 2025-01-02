"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="flex justify-around items-center bg-white shadow-md  py-4 ">

      <Link href="/profile" className="block hover:text-black text-red-600 text-lg font-semibold">User</Link>
      <div className="flex items-center">
        <Image src="/logo.png" alt="CAAT Logo" width={225} height={225} />
      </div>
      <button className="text-red-600 font-semibold hover:underline">Explore</button>
    </header>


      {/* Progress Bar */}
      <div className="flex items-center justify-center bg-gray-200 py-8 px-6 space-x-4">
        <span className="text-red-600 font-medium">View Tasks</span>
        <div className="relative w-1/2 bg-gray-300 h-4 rounded-full">
          <div
            className="absolute top-0 left-0 h-4 bg-red-600 rounded-full"
            style={{ width: "50%" }}
          ></div>
        </div>
        {/*to be change to states */}
        <span className="text-red-600 font-medium">50%</span>
      </div>

      {/* Sidebar and Content */}
      <div className="flex flex-grow ">
        {/* Sidebar */}

        <aside className="bg-white w-1/4 p-6 shadow-md flex flex-col ">
          <nav className="space-y-4 text-gray-700 ml-16">
            <Link href="/profile" className="block hover:text-red-600">My Profile</Link>
            <Link href="/colleges" className="block hover:text-red-600">Colleges</Link>
            <Link href="/courses" className="block hover:text-red-600">Courses</Link>
            <Link href="/essays" className="block hover:text-red-600">Essays</Link>
            <Link href="/extracurriculars" className="block hover:text-red-600">Extracurriculars</Link>
            <Link href="/scholarships" className="block hover:text-red-600">Scholarships</Link>
            <Link href="/evaluate" className="block hover:text-red-600">Evaluate Application</Link>
            <Link href="/chat" className="block hover:text-red-600">Chat CAAT</Link>
          </nav>
        </aside>
        {/* Main Content */}
        <main className="flex-grow p-6">
          <h1 className="text-xl font-bold text-gray-800">Welcome to Your Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Select a section from the sidebar to get started.
          </p>
        </main>
      </div>
    </div>
  );
}
