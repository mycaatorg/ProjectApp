"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTaskContext } from "@/context/TaskContext";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [showTasks, setShowTasks] = useState(false);
  

  const taskLabels: { [key: string]: string } = {
    fillNickname: "Complete Profile",
    writeEssay: "Write Personal Statement",
  };

  const { taskData } = useTaskContext();
  

  const progressPercent = useMemo(() => {
    const values = Object.values(taskData);
    const completed = values.filter(Boolean).length;
    return values.length > 0 ? Math.round((completed / values.length) * 100) : 0;
  }, [taskData]);

  const navItems = [
    { href: "/dashboard/profile", label: "My Profile" },
    { href: "/dashboard/colleges", label: "Colleges" },
    { href: "/dashboard/courses", label: "Courses" },
    { href: "/dashboard/essays", label: "Essays" },
    { href: "/dashboard/resume", label: "Resume" },
    { href: "/dashboard/extracurriculars", label: "Extracurriculars" },
    { href: "/dashboard/scholarships", label: "Scholarships" },
    { href: "/dashboard/evaluate", label: "Evaluate Application" },
    { href: "/dashboard/chatCaat", label: "Chat CAAT" },
    { href: "/dashboard/gameCaat", label: "Game CAAT" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="flex justify-around items-center bg-white shadow-md py-4">
        <Link
          href="/dashboard"
          className="block hover:text-black text-red-600 text-lg font-semibold"
        >
          User
        </Link>
        <div className="flex items-center">
          <Link href="/dashboard">
            <Image
              src="/logo.png"
              alt="CAAT Logo"
              width={225}
              height={225}
              className="cursor-pointer"
            />
          </Link>
        </div>
        <button className="text-red-600 font-semibold hover:underline">Explore</button>
      </header>

      {/* Progress Tracker */}
      <div
        className={`bg-gray-200 px-6 transition-all duration-300 overflow-hidden ${
          showTasks ? "py-8" : "py-6"
        }`}
      >
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={() => setShowTasks((prev) => !prev)}
            className="text-red-600 font-medium hover:underline focus:outline-none"
          >
            {showTasks ? "Hide Tasks" : "View Tasks"}
          </button>
          <div className="relative w-1/2 bg-gray-300 h-4 rounded-full">
            <div
              className="absolute top-0 left-0 h-4 bg-red-600 rounded-full"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <span className="text-red-600 font-medium">{progressPercent}%</span>
        </div>

        {showTasks && (
          <div className="mt-6 max-w-3xl mx-auto bg-white p-6 rounded-md shadow">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Your Application Checklist
            </h2>
            <ul className="space-y-2">
              {Object.entries(taskLabels).map(([key, label]) => (
                <li key={key} className="flex items-center">
                  <span
                    className={`inline-block w-4 h-4 mr-3 rounded-full ${
                      taskData[key] ? "bg-green-500" : "bg-gray-400"
                    }`}
                  ></span>
                  <span
                    className={
                      taskData[key]
                        ? "text-gray-500 line-through"
                        : "text-gray-800"
                    }
                  >
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Sidebar and Content */}
      <div className="flex flex-grow">
        {/* Sidebar */}
        <aside className="bg-white w-1/4 p-6 shadow-md flex flex-col">
          <nav className="space-y-4 text-gray-700 ml-16">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-4 py-2 rounded-md hover:bg-gray-100 ${
                  pathname === item.href ? "bg-gray-200 font-medium" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-grow p-6">{children}</main>
      </div>
    </div>
  );
}
