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

  // Fetch user data from the backend
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:5000/api/user/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData({
            name: data.name || "",
            age: data.age || "",
            email: data.email || "",
            school: data.school || "",
            major: data.major || "",
          });
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  // Handle field editing (placeholder for future functionality)
  const handleEdit = (field: keyof typeof userData, value: string) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
    // TODO: Send updates to the backend
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
              <tr>
                <td className="px-4 py-2 border">Name</td>
                <td className="px-4 py-2 border">{userData.name}</td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() =>
                      handleEdit("name", prompt("Edit Name", userData.name) || userData.name)
                    }
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border">Age</td>
                <td className="px-4 py-2 border">{userData.age}</td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() =>
                      handleEdit("age", prompt("Edit Age", userData.age) || userData.age)
                    }
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border">Email</td>
                <td className="px-4 py-2 border">{userData.email}</td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() =>
                      handleEdit("email", prompt("Edit Email", userData.email) || userData.email)
                    }
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Floating Squares */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white shadow-md p-4 rounded-lg border border-gray-300">
              <h2 className="text-lg font-bold text-gray-800">School</h2>
              <p className="text-gray-600">{userData.school || "No data available"}</p>
              <button
                onClick={() =>
                  handleEdit("school", prompt("Edit School", userData.school) || userData.school)
                }
                className="mt-2 text-blue-600 hover:underline"
              >
                Edit
              </button>
            </div>

            <div className="bg-white shadow-md p-4 rounded-lg border border-gray-300">
              <h2 className="text-lg font-bold text-gray-800">Intended Major</h2>
              <p className="text-gray-600">{userData.major || "No data available"}</p>
              <button
                onClick={() =>
                  handleEdit("major", prompt("Edit Major", userData.major) || userData.major)
                }
                className="mt-2 text-blue-600 hover:underline"
              >
                Edit
              </button>
            </div>

            {/* Placeholder for adding more fields */}
            <div className="bg-white shadow-md p-4 rounded-lg border border-gray-300">
              <h2 className="text-lg font-bold text-gray-800">Other Info</h2>
              <p className="text-gray-600">No data available</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
