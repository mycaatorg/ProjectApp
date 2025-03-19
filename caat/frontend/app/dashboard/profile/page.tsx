"use client";

import React, { useState, useEffect } from "react";

export default function MyProfilePage() {
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
          {/* Name */}
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

          {/* Age */}
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

          {/* Email */}
          <div>
            <label className="text-gray-700 font-medium">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded-md"
              value={userData.email}
              disabled
            />
          </div>

          {/* School */}
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

          {/* Major */}
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

          {/* Languages */}
          <div>
            <label className="text-gray-700 font-medium">Languages</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={userData.languages}
              onChange={(e) =>
                setUserData({ ...userData, languages: e.target.value })
              }
              disabled={!isEditing}
            />
          </div>

          {/* LinkedIn */}
          <div>
            <label className="text-gray-700 font-medium">LinkedIn</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={userData.linkedIn}
              onChange={(e) =>
                setUserData({ ...userData, linkedIn: e.target.value })
              }
              disabled={!isEditing}
            />
            {!isEditing && userData.linkedIn && (
              <a
                href={userData.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Visit LinkedIn
              </a>
            )}
          </div>

          {/* GitHub */}
          <div>
            <label className="text-gray-700 font-medium">GitHub</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={userData.github}
              onChange={(e) =>
                setUserData({ ...userData, github: e.target.value })
              }
              disabled={!isEditing}
            />
            {!isEditing && userData.github && (
              <a
                href={userData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Visit GitHub
              </a>
            )}
          </div>

                    {/* Personal Portfolio */}
          <div>
            <label className="text-gray-700 font-medium">Personal Portfolio</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={userData.portfolio}
              onChange={(e) =>
                setUserData({ ...userData, portfolio: e.target.value })
              }
              disabled={!isEditing}
            />
            {!isEditing && userData.portfolio && (
              <a
                href={userData.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Visit Portfolio
              </a>
            )}
          </div>

          {/* Facebook */}
          <div>
            <label className="text-gray-700 font-medium">Facebook</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={userData.facebook}
              onChange={(e) =>
                setUserData({ ...userData, facebook: e.target.value })
              }
              disabled={!isEditing}
            />
            {!isEditing && userData.facebook && (
              <a
                href={userData.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Visit Facebook
              </a>
            )}
          </div>

          {/* Instagram */}
          <div>
            <label className="text-gray-700 font-medium">Instagram</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={userData.instagram}
              onChange={(e) =>
                setUserData({ ...userData, instagram: e.target.value })
              }
              disabled={!isEditing}
            />
            {!isEditing && userData.instagram && (
              <a
                href={userData.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Visit Instagram
              </a>
            )}
          </div>

          {/* Save/Cancel Buttons */}
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
