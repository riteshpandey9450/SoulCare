import React from "react";
import { FaUserGraduate, FaUserMd, FaCalendarCheck, FaComments } from "react-icons/fa";

const AdminDashboard = () => {
  const stats = [
    { label: "Total Students", value: 240, icon: <FaUserGraduate className="text-indigo-600 text-2xl" /> },
    { label: "Counsellors", value: 4, icon: <FaUserMd className="text-green-600 text-2xl" /> },
    { label: "Appointments", value: 56, icon: <FaCalendarCheck className="text-blue-600 text-2xl" /> },
    { label: "Chatbot Sessions", value: 120, icon: <FaComments className="text-yellow-600 text-2xl" /> },
  ];

  const appointments = [
    { student: "Anonymous-101", counsellor: "Dr. Smith", time: "Today 4:00 PM" },
    { student: "Anonymous-202", counsellor: "Dr. Emily", time: "Tomorrow 11:00 AM" },
  ];

  const engagement = [
    { week: "This Week", active: 120, sessions: 45 },
    { week: "Last Week", active: 90, sessions: 30 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white shadow-md rounded-xl p-6 flex items-center gap-4 hover:shadow-lg transition">
            {stat.icon}
            <div>
              <p className="text-gray-500 text-sm">{stat.label}</p>
              <p className="text-xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Appointments Overview */}
      <div className="bg-white shadow-md rounded-xl p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Upcoming Appointments</h2>
        <div className="space-y-3">
          {appointments.map((appt, i) => (
            <div key={i} className="flex justify-between items-center border-b pb-2">
              <p className="text-gray-700">
                {appt.student} → <span className="font-semibold">{appt.counsellor}</span>
              </p>
              <span className="text-gray-500 text-sm">{appt.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Student Engagement */}
      <div className="bg-white shadow-md rounded-xl p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Student Engagement</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border p-2">Week</th>
              <th className="border p-2">Active Students</th>
              <th className="border p-2">Sessions</th>
            </tr>
          </thead>
          <tbody>
            {engagement.map((row, i) => (
              <tr key={i} className="border-t">
                <td className="border p-2">{row.week}</td>
                <td className="border p-2">{row.active}</td>
                <td className="border p-2">{row.sessions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            Manage Counsellors
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            View Reports
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
