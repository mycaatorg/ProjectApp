"use client";

import React, { useState, useEffect } from "react";

export default function MyProfilePage() {
  const [userData, setUserData] = useState({
    name: "",
    age: "",
    email: "",
    school: "",
    major: "",
    profilePicture: "", // New field for profile picture
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [originalData, setOriginalData] = useState(userData);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "https://caat-projectapp.onrender.com";

  useEffect(() => {
    fetchData();
  }, []);

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
          profilePicture: responseData?.user?.profilePicture || "",
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

  // Handle Image Upload
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
      setUserData({ ...userData, profilePicture: URL.createObjectURL(event.target.files[0]) });
    }
  };

  // Handle Saving Profile (Including Image Upload)
  const handleSave = async () => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) return;

    let imageUrl = userData.profilePicture;
    
    if (selectedImage) {
      const formData = new FormData();
      formData.append("file", selectedImage);

      const uploadResponse = await fetch(`${API_BASE_URL}/api/user/upload-profile-pic`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (uploadResponse.ok) {
        const uploadData = await uploadResponse.json();
        imageUrl = uploadData.imageUrl;
      } else {
        console.error("Image upload failed");
        return;
      }
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/user/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...userData, profilePicture: imageUrl }),
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
      <div className="flex flex-col items-center">
        {/* Profile Picture Upload */}
        <label htmlFor="profile-upload" className="cursor-pointer relative">
          <img
            src={userData.profilePicture || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-24 h-24 object-cover rounded-full border-4 border-gray-300 shadow-md"
          />
          {isEditing && (
            <span className="absolute bottom-0 right-0 bg-gray-600 text-white text-xs px-2 py-1 rounded-full">
              Edit
            </span>
          )}
        </label>
        <input
          type="file"
          id="profile-upload"
          className="hidden"
          accept="image/*"
          onChange={handleImageChange}
        />
        <p className="text-sm text-gray-500 mt-2">Click to upload</p>
      </div>

      <div className="mt-6 space-y-3">
        <div>
          <label className="text-gray-700 font-medium">Nickname</label>
          <input
            type="text"
            className="w-full p-2 border rounded-md"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            disabled={!isEditing}
          />
        </div>
        {/* Other input fields remain unchanged */}
      </div>

      {isEditing && (
        <div className="flex justify-end space-x-3 mt-4">
          <button
            onClick={() => setIsEditing(false)}
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
  );
}
