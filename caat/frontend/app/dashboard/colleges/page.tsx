"use client";

import React, { useState, useEffect } from "react";
import { College } from "@/types/express/college";
import LoadingSpinner from "@/components/loadingSpinner";

export default function CollegeSearch() {
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("");
  const [sort, setSort] = useState("alpha");
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(false); // NEW

  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    fetchColleges();
  }, [search, country, sort]);

  const fetchColleges = async () => {
    setLoading(true); // NEW
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/colleges?search=${search}&country=${country}&sort=${sort}`
      );
      const data = await response.json();

      if (Array.isArray(data.colleges)) {
        setColleges(data.colleges);
      } else {
        console.error("Invalid API response:", data);
        setColleges([]);
      }
    } catch (error) {
      console.error("Error fetching colleges:", error);
    } finally {
      setLoading(false); // NEW
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Search Universities</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by name..."
        className="w-full p-2 border rounded-md mb-3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Country Filter */}
      <select
        className="w-full p-2 border rounded-md mb-3"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      >
        <option value="">All Countries</option>
        <option value="Australia">Australia</option>
        <option value="United States">United States</option>
        <option value="Canada">Canada</option>
        <option value="United Kingdom">United Kingdom</option>
      </select>

      {/* Sort Filter */}
      <select
        className="w-full p-2 border rounded-md mb-6"
        value={sort}
        onChange={(e) => setSort(e.target.value)}
      >
        <option value="alpha">Alphabetical (A-Z)</option>
        <option value="alpha-desc">Alphabetical (Z-A)</option>
        <option value="country">Country (A-Z)</option>
        <option value="country-desc">Country (Z-A)</option>
      </select>

      {/* University List OR Loading */}
      {loading ? (
        <LoadingSpinner text="Fetching universities..." />
      ) : (
        <div className="space-y-3">
          {colleges.length > 0 ? (
            colleges.map((college, index) => (
              <div key={index} className="bg-gray-100 p-3 rounded-md">
                <h2 className="text-lg font-semibold">{college.name}</h2>
                <p className="text-gray-600">{college.country}</p>
                {college.website && (
                  <a
                    href={college.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Visit Website
                  </a>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-600">No universities found.</p>
          )}
        </div>
      )}
    </div>
  );
}
