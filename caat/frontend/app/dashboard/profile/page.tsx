"use client";

import React, { useState, useEffect } from "react";

export default function MyProfilePage() {
  const [userData, setUserData] = useState({
    name: "",
    age: "",
    email: "",
    school: "",
    major: "",
  });

  const [isLoading, setIsLoading] = useState(true);

  // Get the API URL from environment variables
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://caat-projectapp.onrender.com";

  // Fetch user data from the backend
  useEffect(() => {
    async function fetchData() {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!token) return;

      try {
        const response = await fetch(`${API_BASE_URL}/api/user/profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Send the JWT token
          },
        });

        if (response.ok) {
          const { user } = await response.json(); // Extract `user` field
          setUserData({
            name: user?.name || "",
            age: user?.age || "",
            email: user?.email || "",
            school: user?.school || "",
            major: user?.major || "",
          });
        } else {
          console.error("Failed to fetch profile data");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  // Handle field editing and send the update request
  const handleEdit = async (field: keyof typeof userData, value: string) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) return;

    const updatedData = { ...userData, [field]: value };
    setUserData(updatedData);

    try {
      const response = await fetch(`${API_BASE_URL}/api/user/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        console.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Profile</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* Profile Table */}
          <table className="table-auto w-full mb-6 border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left">Field</th>
                <th className="px-4 py-2 text-left">Value</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(userData).map(([key, value]) => (
                <tr key={key}>
                  <td className="px-4 py-2 border">{key.charAt(0).toUpperCase() + key.slice(1)}</td>
                  <td className="px-4 py-2 border">{value}</td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => {
                        const newValue = prompt(`Edit ${key}`, value);
                        if (newValue !== null) {
                          handleEdit(key as keyof typeof userData, newValue);
                        }
                      }}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
