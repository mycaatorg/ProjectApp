"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import React, { useEffect } from "react";

//Reusable toolbar button
const ToolbarButton = ({
  onClick,
  isActive,
  children,
}: {
  onClick: () => void;
  isActive: boolean;
  children: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    className={`px-2 py-1 rounded-md transition text-sm font-medium ${
      isActive
        ? "bg-blue-600 text-white"
        : "bg-white text-gray-800 hover:bg-gray-200"
    }`}
  >
    {children}
  </button>
);

interface RichTextEditorProps {
  content: string;
  onChange: (value: string) => void;
}

export default function RichTextEditor({
  content,
  onChange,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ["paragraph"] }),
    ],
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) return null;

  return (
    <div>
      {/*Toolbar */}
      <div className="flex flex-wrap items-center gap-2 mb-3 bg-gray-100 p-2 rounded-md shadow-sm">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
        >
          B
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic")}
        >
          I
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          isActive={editor.isActive({ textAlign: "left" })}
        >
          Left
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          isActive={editor.isActive({ textAlign: "center" })}
        >
          Center
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          isActive={editor.isActive({ textAlign: "right" })}
        >
          Right
        </ToolbarButton>
      </div>

      {/* ✍️ Editor */}
      <div className="border border-gray-300 rounded-md p-2 min-h-[120px] focus:outline-none">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
