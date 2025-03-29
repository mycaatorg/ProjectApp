"use client";

import React from "react";
import Link from "next/link";

const essayTypes = [
  { id: "personal-statement", label: "Personal Statement" },
  { id: "why-this-university", label: "Why This University" },
  { id: "why-this-course", label: "Why This Course" },
  { id: "career-goals", label: "Career Goals" },
  { id: "overcoming-challenges", label: "Overcoming Challenges" },
  { id: "extracurricular-reflection", label: "Extracurricular Reflection" },
  { id: "diversity-or-background", label: "Diversity or Background" },
  { id: "scholarship-essay", label: "Scholarship Essay" },
  { id: "creative-prompt", label: "Creative Prompt" },
];

export default function EssaysPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Draft or explore common university essay types
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {essayTypes.map(({ id, label }) => (
          <Link
            key={id}
            href={`/dashboard/essays/${id}`}
            className="bg-gray-300 hover:bg-gray-400 text-black font-medium py-10 rounded-md shadow-sm transition duration-200 text-center flex items-center justify-center"
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
