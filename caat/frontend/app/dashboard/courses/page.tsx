"use client";

import React from "react";

const studyFields = [
  "Computer Science",
  "Medical Science",
  "Business",
  "Arts",
  "Engineering",
  "Information Technology",
  "Law",
  "Psychology",
  "Education",
  "Economics",
  "Environmental Science",
  "Media and Communication",
  "Political Science",
  "Design",
  "Data Science",
  "Management",
  "Architecture",
  "International Relations"
];

export default function CoursesPage() {
  const handleFieldClick = (field: string) => {
    alert(`Coming soon: ${field} details!`);
    // In future, you’ll route to: /dashboard/courses/${slug}
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Explore study fields that excite you
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {studyFields.map((field) => (
          <button
            key={field}
            onClick={() => handleFieldClick(field)}
            className="bg-gray-300 hover:bg-gray-400 text-black font-medium py-10 rounded-md shadow-sm transition duration-200 text-center"
          >
            {field}
          </button>
        ))}
      </div>
    </div>
  );
}
