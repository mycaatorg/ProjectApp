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
import RichTextEditor from "@/components/RichTextEditor";

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
      className="bg-white p-4 rounded-md shadow border"
    >
      <h2
        className="text-lg font-semibold mb-2 cursor-move"
        {...attributes}
        {...listeners}
      >
        {label}
      </h2>

      <RichTextEditor
        content={content}
        onChange={(value) => onChange(id, value)}
      />

      <p className="text-xs text-gray-400 mt-2">Drag to reorder</p>
    </div>
  );
}

export default function ResumeBuilderPage() {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "https://caat-projectapp.onrender.com";

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    const fetchResume = async () => {
      if (!token) return;

      try {
        const res = await fetch(`${API_BASE_URL}/api/resume`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          const saved = data.sections;

          if (!saved || saved.length === 0) {
            setSections(getDefaultSections());
          } else {
            setSections(saved);
          }
        } else {
          setSections(getDefaultSections());
        }
      } catch (err) {
        console.error("Resume fetch error:", err);
        setSections(getDefaultSections());
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, [token]);

  const getDefaultSections = () => [
    { id: "personal", label: "🧍 Personal Info", content: "" },
    { id: "education", label: "📘 Education", content: "" },
    { id: "extracurriculars", label: "🎯 Extracurriculars", content: "" },
    { id: "awards", label: "🏆 Awards", content: "" },
    { id: "skills", label: "🧠 Skills & Interests", content: "" },
  ];

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = sections.findIndex((s) => s.id === active.id);
      const newIndex = sections.findIndex((s) => s.id === over.id);
      setSections(arrayMove(sections, oldIndex, newIndex));
    }
  };

  const handleContentChange = (id: string, value: string) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === id ? { ...section, content: value } : section
      )
    );
  };

  const saveResume = async () => {
    if (!token) return;
    setSaving(true);
    setMessage("");

    try {
      const res = await fetch(`${API_BASE_URL}/api/resume`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ sections }),
      });

      if (res.ok) {
        setMessage("Resume saved!");
      } else {
        setMessage("Failed to save resume.");
      }
    } catch (err) {
      console.error("Save error:", err);
      setMessage("Error saving resume.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Resume Builder</h1>
        <button
          onClick={saveResume}
          disabled={saving}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          {saving ? "Saving..." : "Save All"}
        </button>
      </div>

      {message && <p className="text-sm text-green-600 mb-4">{message}</p>}

      {loading ? (
        <p>Loading resume...</p>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToVerticalAxis]}
        >
          <SortableContext
            items={sections.map((s) => s.id)}
            strategy={verticalListSortingStrategy}
          >
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
