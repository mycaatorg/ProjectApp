"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfileSetup() {
  const [currentStep, setCurrentStep] = useState(1); // Track the current step
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    school: "",
    major: "",
    yearOfStudy: "",
    satScores: "",
    actScores: "",
    gpa: "",
    collegePreparation: "",
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1); // Move to the next step
    } else {
      handleSubmit(); // Submit on the last step
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1); // Move to the previous step
    }
  };

  const handleSubmit = () => {
    console.log("Final Form Data:", formData);
    setTimeout(() => {
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-mainCustomColor p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4 text-white">
          Enter Your Details
        </h1>
        <form className="space-y-4">
          {/* Step 1 */}
          {currentStep === 1 && (
            <>
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-white"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-white"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="school"
                  className="block text-sm font-medium text-white"
                >
                  School
                </label>
                <input
                  type="text"
                  id="school"
                  name="school"
                  value={formData.school}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="major"
                  className="block text-sm font-medium text-white"
                >
                  Intended Major
                </label>
                <input
                  type="text"
                  id="major"
                  name="major"
                  value={formData.major}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="yearOfStudy"
                  className="block text-sm font-medium text-white"
                >
                  Year of Study
                </label>
                <input
                  type="text"
                  id="yearOfStudy"
                  name="yearOfStudy"
                  value={formData.yearOfStudy}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  required
                />
              </div>
            </>
          )}

          {/* Step 2 */}
          {currentStep === 2 && (
            <>
              <div>
                <label
                  htmlFor="satScores"
                  className="block text-sm font-medium text-white"
                >
                  SAT Scores (Optional)
                </label>
                <input
                  type="text"
                  id="satScores"
                  name="satScores"
                  value={formData.satScores}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="actScores"
                  className="block text-sm font-medium text-white"
                >
                  ACT Scores (Optional)
                </label>
                <input
                  type="text"
                  id="actScores"
                  name="actScores"
                  value={formData.actScores}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="gpa"
                  className="block text-sm font-medium text-white"
                >
                  GPA (Optional)
                </label>
                <input
                  type="text"
                  id="gpa"
                  name="gpa"
                  value={formData.gpa}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="collegePreparation"
                  className="block text-sm font-medium text-white"
                >
                  Have you started preparing college applications? (Yes/No)
                </label>
                <input
                  type="text"
                  id="collegePreparation"
                  name="collegePreparation"
                  value={formData.collegePreparation}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>
            </>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition"
              >
                Back
              </button>
            )}
            <button
              type="button"
              onClick={handleNext}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
            >
              {currentStep < 2 ? "Next" : "Submit"}
            </button>
          </div>
        </form>

        {/* Move Progress Dots Below */}
       
      </div>
      <div className="flex justify-center mt-6 space-x-2">
          <div
            className={`w-4 h-4 rounded-full ${
              currentStep === 1 ? "bg-red-500" : "bg-gray-300"
            }`}
          ></div>
          <div
            className={`w-4 h-4 rounded-full ${
              currentStep === 2 ? "bg-red-500" : "bg-gray-300"
            }`}
          ></div>
        </div>
    </div>
  );
}
