"use client";

import React, { useState, useEffect } from "react";

export default function MyProfilePage() {
  const [userData, setUserData] = useState({
    name: "",
    age: "",
    email: "",
    school: "",
    major: "",
    profilePicture: "", // Added for profile picture
  });

  const [originalData, setOriginalData] = useState(userData);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null); // Store uploaded file
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "https://caat-projectapp.onrender.com";

  // Fetch user data from backend
  const fetchData = async () => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/user/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        setUserData({
          name: responseData?.user?.name || "",
          age: responseData?.user?.age || "",
          email: responseData?.user?.email || "",
          school: responseData?.user?.school || "",
          major: responseData?.user?.major || "",
          profilePicture: responseData?.user?.profilePicture || "", // Fetch profile pic
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

  // Handle saving edited data
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

  // Handle profile picture upload
  const handleImageUpload = async () => {
    if (!imageFile) return;

    const formData = new FormData();
    formData.append("file", imageFile);

    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/user/profile/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        setUserData({ ...userData, profilePicture: responseData.user.profilePicture });
        setImageFile(null);
      } else {
        console.error("Failed to upload profile picture");
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
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
          {/* Profile Picture Upload */}
          <div className="flex flex-col items-center">
            <img
              src={userData.profilePicture || "/default-profile.png"}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
            />
            {isEditing && (
              <div className="mt-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                />
                <button
                  onClick={handleImageUpload}
                  className="bg-blue-600 text-white px-3 py-1 rounded-md mt-2 hover:bg-blue-700"
                >
                  Upload
                </button>
              </div>
            )}
          </div>

          {/* User Fields */}
          <div>
            <label className="text-gray-700 font-medium">NickName</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
              disabled={!isEditing}
            />
          </div>

          <div>
            <label className="text-gray-700 font-medium">Age</label>
            <input
              type="number"
              className="w-full p-2 border rounded-md"
              value={userData.age}
              onChange={(e) =>
                setUserData({ ...userData, age: e.target.value })
              }
              disabled={!isEditing}
            />
          </div>

          <div>
            <label className="text-gray-700 font-medium">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded-md"
              value={userData.email}
              disabled
            />
          </div>

          <div>
            <label className="text-gray-700 font-medium">School</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={userData.school}
              onChange={(e) =>
                setUserData({ ...userData, school: e.target.value })
              }
              disabled={!isEditing}
            />
          </div>

          <div>
            <label className="text-gray-700 font-medium">Major</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={userData.major}
              onChange={(e) =>
                setUserData({ ...userData, major: e.target.value })
              }
              disabled={!isEditing}
            />
          </div>

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
