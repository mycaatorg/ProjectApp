import React from "react";

export default function ComingSoon({ title = "Page in Development", message = "Stay tuned for updates!" }: { title?: string; message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full py-24 text-center">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p className="text-lg text-gray-600">{message}</p>
      <div className="mt-6 w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin" />
    </div>
  );
}
