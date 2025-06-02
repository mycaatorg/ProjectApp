"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function MyProfilePage() {
  const router = useRouter();
  const [userData, setUserData] = useState({
    name: "",
    age: "",
    email: "",
    school: "",
    major: "",
    languages: "",
    linkedIn: "",
    github: "",
    portfolio: "",
    facebook: "",
    instagram: "",
  });

  const [originalData, setOriginalData] = useState(userData);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL;


  const fetchData = async () => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (!token) {
      router.push("/auth/login");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/user/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("token");
        router.push("/auth/login");
        return;
      }

      if (response.ok) {
        const responseData = await response.json();
        setUserData({
          name: responseData?.user?.name || "",
          age: responseData?.user?.age || "",
          email: responseData?.user?.email || "",
          school: responseData?.user?.school || "",
          major: responseData?.user?.major || "",
          languages: responseData?.user?.languages || "",
          linkedIn: responseData?.user?.linkedIn || "",
          github: responseData?.user?.github || "",
          portfolio: responseData?.user?.portfolio || "",
          facebook: responseData?.user?.facebook || "",
          instagram: responseData?.user?.instagram || "",
        });
        setOriginalData(responseData?.user);
      } else {
        console.error("Failed to fetch profile data");
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async () => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/user/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        setIsEditing(false);
        fetchData();
      } else {
        console.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-gray-100 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4 bg-gray-50 p-4 rounded-md">
        <h1 className="text-xl font-semibold text-gray-800">
          Welcome {userData.name}!
        </h1>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-600 hover:underline text-sm"
          >
            Edit Profile
          </button>
        )}
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-3">
          {[
            { label: "NickName", key: "name" },
            { label: "Age", key: "age", type: "number" },
            { label: "Email", key: "email", disabled: true },
            { label: "School", key: "school" },
            { label: "Major", key: "major" },
            { label: "Languages", key: "languages" },
            { label: "LinkedIn", key: "linkedIn", link: true },
            { label: "GitHub", key: "github", link: true },
            { label: "Personal Portfolio", key: "portfolio", link: true },
            { label: "Facebook", key: "facebook", link: true },
            { label: "Instagram", key: "instagram", link: true },
          ].map(({ label, key, type = "text", disabled = false, link = false }) => (
            <div key={key}>
              <label className="text-gray-700 font-medium">{label}</label>
              <input
                type={type}
                className="w-full p-2 border rounded-md"
                value={(userData as any)[key]}
                onChange={(e) =>
                  setUserData({ ...userData, [key]: e.target.value })
                }
                disabled={disabled || !isEditing}
              />
              {!isEditing && link && userData[key as keyof typeof userData] && (
                <a
                  href={(userData as any)[key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Visit {label}
                </a>
              )}
            </div>
          ))}

          {isEditing && (
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => {
                  setUserData(originalData);
                  setIsEditing(false);
                }}
                className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
