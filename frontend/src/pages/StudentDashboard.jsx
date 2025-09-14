import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function StudentDashboard() {
  const [chatSummary, setChatSummary] = useState(null);

  // Mock fetch for demo: In reality, fetch this from your backend
  useEffect(() => {
    // Example: API that stores chatbot summaries per student
    async function fetchSummary() {
      // Replace with real API endpoint
      const response = await fetch("http://localhost:5000/api/chat/summary/last");
      if (response.ok) {
        const data = await response.json();
        setChatSummary(data.summary);
      } else {
        // fallback demo summary
        setChatSummary([
          "Practice 5 minutes of deep breathing.",
          "Take a short walk or do light exercise.",
          "Write down 3 positive thoughts before sleep."
        ]);
      }
    }
    fetchSummary();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Welcome back, <span className="text-indigo-600">Student</span> 👋
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Sessions */}
        <div className="lg:col-span-2 bg-white shadow-md rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Upcoming Sessions</h2>
          <div className="space-y-3">
            <div className="p-4 border rounded-lg flex justify-between items-center hover:bg-gray-50">
              <div>
                <p className="font-medium">Dr. Smith (Counsellor)</p>
                <p className="text-sm text-gray-500">Today, 4:00 PM</p>
              </div>
              <button className="bg-indigo-600 text-white px-3 py-1 rounded-lg hover:bg-indigo-700">
                Join
              </button>
            </div>

            <div className="p-4 border rounded-lg flex justify-between items-center hover:bg-gray-50">
              <div>
                <p className="font-medium">Dr. Emily (Counsellor)</p>
                <p className="text-sm text-gray-500">Tomorrow, 11:00 AM</p>
              </div>
              <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg cursor-not-allowed">
                Pending
              </button>
            </div>
          </div>
        </div>

        {/* Quick Access */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Quick Access</h2>
          <div className="flex flex-col gap-3">
            <Link
              to="/chatbot"
              className="bg-indigo-600 text-white py-2 px-4 rounded-lg text-center hover:bg-indigo-700"
            >
              AI Chatbot
            </Link>
            <Link
              to="/booking"
              className="bg-green-600 text-white py-2 px-4 rounded-lg text-center hover:bg-green-700"
            >
              Book Session
            </Link>
            <Link
              to="/resources"
              className="bg-blue-600 text-white py-2 px-4 rounded-lg text-center hover:bg-blue-700"
            >
              Resources
            </Link>
          </div>
        </div>
      </div>

      {/* Chat Summary Section */}
      <div className="mt-8 bg-white shadow-md rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">AI Chat Summary</h2>
        {chatSummary ? (
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {chatSummary.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">No recent chat summary available.</p>
        )}
      </div>

      {/* Resources Section */}
      <div className="mt-8 bg-white shadow-md rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Recommended Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg hover:shadow">
            <h3 className="font-medium">Relaxation Audio</h3>
            <p className="text-sm text-gray-500">5 min guided breathing</p>
          </div>
          <div className="p-4 border rounded-lg hover:shadow">
            <h3 className="font-medium">Stress Management Guide</h3>
            <p className="text-sm text-gray-500">Quick tips for exams</p>
          </div>
          <div className="p-4 border rounded-lg hover:shadow">
            <h3 className="font-medium">Motivational Video</h3>
            <p className="text-sm text-gray-500">Stay positive daily</p>
          </div>
        </div>
      </div>
    </div>
  );
}
