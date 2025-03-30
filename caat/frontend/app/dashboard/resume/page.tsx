"use client";

import React, { useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

type Section = {
  id: string;
  label: string;
  content: string;
};

type SortableBlockProps = {
  id: string;
  label: string;
  content: string;
  onChange: (id: string, value: string) => void;
};

function SortableBlock({ id, label, content, onChange }: SortableBlockProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white p-4 rounded-md shadow border cursor-move"
    >
      <h2 className="text-lg font-semibold mb-2">{label}</h2>

      <textarea
        value={content}
        onChange={(e) => onChange(id, e.target.value)}
        placeholder="Type here..."
        rows={1}
        className="w-full p-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        style={{ height: `${Math.max(80, content.split("\n").length * 24)}px` }}
      />

      <p className="text-xs text-gray-400 mt-2">Drag to reorder</p>
    </div>
  );
}

export default function ResumeBuilderPage() {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);

  const sensors = useSensors(useSensor(PointerSensor));

  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "https://caat-projectapp.onrender.com";
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // Fetch resume data
  useEffect(() => {
        const fetchResume = async () => {
          if (!token) return;
      
          try {
            const res = await fetch(`${API_BASE_URL}/api/resume`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
      
            if (res.ok) {
              const data = await res.json();
              const saved = data.resume?.sections;
      
              if (!saved || saved.length === 0) {
                // 🔁 Use fallback if no saved resume
                setSections([
                  { id: "personal", label: "🧍 Personal Info", content: "" },
                  { id: "education", label: "📘 Education", content: "" },
                  { id: "extracurriculars", label: "🎯 Extracurriculars", content: "" },
                  { id: "awards", label: "🏆 Awards", content: "" },
                  { id: "skills", label: "🧠 Skills & Interests", content: "" },
                ]);
              } else {
                setSections(saved);
              }
            } else if (res.status === 404) {
              // No resume found (new user)
              setSections([
                { id: "personal", label: "🧍 Personal Info", content: "" },
                { id: "education", label: "📘 Education", content: "" },
                { id: "extracurriculars", label: "🎯 Extracurriculars", content: "" },
                { id: "awards", label: "🏆 Awards", content: "" },
                { id: "skills", label: "🧠 Skills & Interests", content: "" },
              ]);
            } else {
              console.error("Failed to load resume");
            }
          } catch (err) {
            console.error("Resume fetch error:", err);
          } finally {
            setLoading(false);
          }
        };
      
        fetchResume();
      }, [token]);
      

  // Handle drag + reorder
  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = sections.findIndex((s) => s.id === active.id);
      const newIndex = sections.findIndex((s) => s.id === over.id);
      const newSections = arrayMove(sections, oldIndex, newIndex);
      setSections(newSections);
      saveResume(newSections);
    }
  }

  // Handle editing text
  const handleContentChange = (id: string, value: string) => {
    const updated = sections.map((section) =>
      section.id === id ? { ...section, content: value } : section
    );
    setSections(updated);
    saveResume(updated);
  };

  // Save to backend
  const saveResume = async (data: Section[]) => {
    if (!token) return;
    try {
      await fetch(`${API_BASE_URL}/api/resume`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ sections: data }),
      });
    } catch (err) {
      console.error("Resume save error:", err);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Resume Builder</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToVerticalAxis]}
        >
          <SortableContext items={sections.map((s) => s.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-6">
              {sections.map((section) => (
                <SortableBlock
                  key={section.id}
                  id={section.id}
                  label={section.label}
                  content={section.content}
                  onChange={handleContentChange}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}
