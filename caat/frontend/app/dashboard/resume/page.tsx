"use client";

import React, { useState } from "react";
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

const sections = [
  { id: "personal", label: "🧍 Personal Info" },
  { id: "education", label: "📘 Education" },
  { id: "extracurriculars", label: "🎯 Extracurriculars" },
  { id: "awards", label: "🏆 Awards" },
  { id: "skills", label: "🧠 Skills & Interests" },
];

function SortableBlock({ id, label }: { id: string; label: string }) {
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
      <p className="text-sm text-gray-500">Drag to reorder this section</p>
    </div>
  );
}

export default function ResumeBuilderPage() {
  const [items, setItems] = useState(sections);

  const sensors = useSensors(useSensor(PointerSensor));

  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over.id);
      setItems(arrayMove(items, oldIndex, newIndex));
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Resume Builder</h1>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <div className="space-y-6">
            {items.map((section) => (
              <SortableBlock key={section.id} id={section.id} label={section.label} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
