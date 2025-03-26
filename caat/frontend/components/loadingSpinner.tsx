import React from "react";

export default function LoadingSpinner({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      <p className="mt-2 text-gray-600">{text}</p>
    </div>
  );
}
