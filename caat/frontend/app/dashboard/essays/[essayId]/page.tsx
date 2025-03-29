"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function EssayEditorPage() {
  const router = useRouter();
  const { essayId } = useParams();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "https://caat-projectapp.onrender.com";

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const formatTitle = (id: string | string[] | undefined) =>
    id?.toString().replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

  // Load essay content
  const fetchEssay = async () => {
    if (!essayId || !token) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/essays/${essayId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setContent(data.content);
      } else if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("token");
        window.location.href = "/auth/login";
      } else {
        console.error("Failed to load essay");
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEssay();
  }, [essayId]);

  // Save essay content
  const handleSave = async () => {
    if (!token) return;

    setSaving(true);
    setMessage("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/essays/${essayId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content }),
      });

      if (response.ok) {
        setMessage("Essay saved successfully!");
        setLastSaved(new Date());
      } else {
        setMessage("Failed to save essay.");
      }
    } catch (err) {
      console.error("Save error:", err);
      setMessage("Server error while saving.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* 🔙 Back and breadcrumb */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => router.back()}
          className="text-blue-600 hover:underline text-sm"
        >
          ← Go Back
        </button>

        <div className="text-sm text-gray-500 italic space-x-1">
          <Link href="/dashboard" className="hover:underline text-blue-600">
            Dashboard
          </Link>
          <span>/</span>
          <Link href="/dashboard/essays" className="hover:underline text-blue-600">
            Essays
          </Link>
          <span>/</span>
          <span>{formatTitle(essayId)}</span>
        </div>
      </div>

      {/* ✍️ Essay Editor */}
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        {formatTitle(essayId)}
      </h1>

      {loading ? (
        <p className="text-gray-600">Loading essay...</p>
      ) : (
        <>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start writing your essay here..."
            rows={20}
            className="w-full p-4 border border-gray-300 rounded-md mb-4 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex items-center justify-between">
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            >
              {saving ? "Saving..." : "Save Essay"}
            </button>

            <div className="text-sm text-gray-600 ml-4">
              {message && <p>{message}</p>}
              {lastSaved && (
                <p className="text-xs mt-1 italic">
                  Last saved at {lastSaved.toLocaleTimeString()}
                </p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
