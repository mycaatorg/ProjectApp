"use client";

import React from "react";

const essayTypes = [
  "Personal Statement",
  "Why This University",
  "Why This Course",
  "Career Goals",
  "Overcoming Challenges",
  "Extracurricular Reflection",
  "Diversity or Background",
  "Scholarship Essay",
  "Creative Prompt",
];

export default function EssaysPage() {
  const handleEssayClick = (type: string) => {
    alert(`Coming soon: ${type} editor or template!`);
    // Later: navigate to /dashboard/essays/[slug]
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Draft or explore common university essay types
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {essayTypes.map((type) => (
          <button
            key={type}
            onClick={() => handleEssayClick(type)}
            className="bg-gray-300 hover:bg-gray-400 text-black font-medium py-10 rounded-md shadow-sm transition duration-200 text-center"
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
}
