// CounsellorProfile.jsx
import React from "react";

export default function CounsellorProfile() {
  const counsellor = {
    id: "C-101",
    name: "Dr. Emily Carter",
    experience: "8 years",
    specialization: "Clinical Psychology, Stress Management",
    email: "emily.carter@example.com",
    phone: "+91 98765 43210",
    image:
      "https://randomuser.me/api/portraits/women/44.jpg",
    qualification: "PhD in Clinical Psychology",
    availability: "Mon - Fri, 10:00 AM - 6:00 PM",
    languages: ["English", "Hindi"],
    bio: "Passionate about helping students overcome stress, anxiety, and personal challenges through empathetic counselling and evidence-based practices.",
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-6">
      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-3xl w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={counsellor.image}
            alt={counsellor.name}
            className="w-32 h-32 rounded-full object-cover border-4 border-indigo-600"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {counsellor.name}
            </h1>
            <p className="text-gray-600">{counsellor.specialization}</p>
            <p className="text-sm text-gray-500">
              {counsellor.qualification}
            </p>
          </div>
        </div>

        {/* Details */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <p className="text-sm text-gray-500">Counsellor ID</p>
            <p className="font-semibold">{counsellor.id}</p>
          </div>
          <div className="p-4 border rounded-lg">
            <p className="text-sm text-gray-500">Experience</p>
            <p className="font-semibold">{counsellor.experience}</p>
          </div>
          <div className="p-4 border rounded-lg">
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-semibold">{counsellor.email}</p>
          </div>
          <div className="p-4 border rounded-lg">
            <p className="text-sm text-gray-500">Phone</p>
            <p className="font-semibold">{counsellor.phone}</p>
          </div>
          <div className="p-4 border rounded-lg">
            <p className="text-sm text-gray-500">Availability</p>
            <p className="font-semibold">{counsellor.availability}</p>
          </div>
          <div className="p-4 border rounded-lg">
            <p className="text-sm text-gray-500">Languages</p>
            <p className="font-semibold">{counsellor.languages.join(", ")}</p>
          </div>
        </div>

        {/* Bio */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">About</h2>
          <p className="text-gray-600 text-sm">{counsellor.bio}</p>
        </div>
      </div>
    </div>
  );
}
