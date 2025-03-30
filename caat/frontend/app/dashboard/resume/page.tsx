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
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

type ResumeSection = {
  id: string;
  label: string;
  content: string;
};

export default function ResumeBuilderPage() {
  const [sections, setSections] = useState<ResumeSection[]>([]);
  const [saving, setSaving] = useState(false);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://caat-projectapp.onrender.com";
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const sensors = useSensors(useSensor(PointerSensor));

  // Fetch resume from backend
  const fetchResume = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/resume`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setSections(data.sections || []);
    } catch (err) {
      console.error("Failed to load resume", err);
    }
  };

  // Save resume to backend
  const saveResume = async () => {
    try {
      setSaving(true);
      await fetch(`${API_BASE_URL}/api/resume`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ sections }),
      });
    } catch (err) {
      console.error("Failed to save resume", err);
    } finally {
      setSaving(false);
    }
  };

  // Drag handler
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = sections.findIndex((s) => s.id === active.id);
      const newIndex = sections.findIndex((s) => s.id === over.id);
      const newOrder = arrayMove(sections, oldIndex, newIndex);
      setSections(newOrder);
      saveResume();
    }
  };

  useEffect(() => {
    fetchResume();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Resume Builder</h1>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        modifiers={[restrictToVerticalAxis]}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={sections.map((s) => s.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-6">
            {sections.map((section, index) => (
              <EditableBlock
                key={section.id}
                id={section.id}
                label={section.label}
                content={section.content}
                onChange={(text) => {
                  const updated = [...sections];
                  updated[index].content = text;
                  setSections(updated);
                  saveResume();
                }}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {saving && <p className="text-sm text-gray-500 mt-4">Saving...</p>}
    </div>
  );
}

function EditableBlock({
  id,
  label,
  content,
  onChange,
}: {
  id: string;
  label: string;
  content: string;
  onChange: (text: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="bg-white p-4 rounded-md shadow border cursor-move"
    >
      <h2 className="text-lg font-semibold mb-2">{label}</h2>
      <textarea
        value={content}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Start typing..."
        className="w-full border p-2 rounded-md text-sm resize-none focus:ring-2 focus:ring-blue-500"
        rows={5}
      />
    </div>
  );
}
