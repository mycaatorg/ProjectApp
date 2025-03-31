// components/RichTextEditor.tsx
"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import React, { useEffect } from "react";

interface RichTextEditorProps {
  content: string;
  onChange: (value: string) => void;
}

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit, TextAlign.configure({ types: ["paragraph"] })],
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content, false);
    }
  }, [content]);

  if (!editor) return null;

  return (
    <div>
      {/* Toolbar */}
      <div className="flex gap-2 mb-2">
        <button onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive("bold") ? "font-bold text-blue-600" : ""}>B</button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive("italic") ? "italic text-blue-600" : ""}>I</button>
        <button onClick={() => editor.chain().focus().setTextAlign("left").run()}>Left</button>
        <button onClick={() => editor.chain().focus().setTextAlign("center").run()}>Center</button>
        <button onClick={() => editor.chain().focus().setTextAlign("right").run()}>Right</button>
      </div>

      <div className="border border-gray-300 rounded-md p-2 min-h-[120px] focus:outline-none">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
