"use client";

import React from "react";

interface PreviewSection {
  id: string;
  label: string;
  content: string;
}

export default function ResumePreview({ sections }: { sections: PreviewSection[] }) {
  return (
    <div id="resume-preview" className="bg-white p-6 rounded-md shadow border mb-8">
      <h2 className="text-2xl font-bold text-center mb-6">Resume Preview</h2>

      {sections.map((section, idx) => (
        <div key={section.id} className="mb-6">
          <h3 className="text-xl font-semibold mb-2">{section.label}</h3>
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: section.content }}
          />
          {idx !== sections.length - 1 && <hr className="my-4 border-gray-300" />}
        </div>
      ))}
    </div>
  );
}
