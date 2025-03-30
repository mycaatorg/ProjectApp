"use client";

import React from "react";

export default function ResumeBuilderPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Resume Builder</h1>

      <div className="space-y-6">
        {/* Personal Info Block */}
        <section className="bg-white p-4 rounded-md shadow border">
          <h2 className="text-lg font-semibold mb-2">🧍 Personal Info</h2>
          <p className="text-sm text-gray-500">Add your name, email, and location</p>
        </section>

        {/* Education Block */}
        <section className="bg-white p-4 rounded-md shadow border">
          <h2 className="text-lg font-semibold mb-2">📘 Education</h2>
          <p className="text-sm text-gray-500">List your schools, GPA, courses, etc.</p>
        </section>

        {/* Extracurricular Block */}
        <section className="bg-white p-4 rounded-md shadow border">
          <h2 className="text-lg font-semibold mb-2">🎯 Extracurriculars</h2>
          <p className="text-sm text-gray-500">Clubs, leadership, volunteer work, etc.</p>
        </section>

        {/* Awards Block */}
        <section className="bg-white p-4 rounded-md shadow border">
          <h2 className="text-lg font-semibold mb-2">🏆 Awards</h2>
          <p className="text-sm text-gray-500">Honors, achievements, scholarships</p>
        </section>

        {/* Skills Block */}
        <section className="bg-white p-4 rounded-md shadow border">
          <h2 className="text-lg font-semibold mb-2">🧠 Skills & Interests</h2>
          <p className="text-sm text-gray-500">Languages, software, hobbies, etc.</p>
        </section>
      </div>
    </div>
  );
}
