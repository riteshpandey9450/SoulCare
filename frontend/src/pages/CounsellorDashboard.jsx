import React, { useState, useEffect } from "react";

const CounsellorDashboard = () => {
  const [bookings, setBookings] = useState([]);

  // Sample data (replace with API later)
  useEffect(() => {
    const todayBookings = [
      {
        id: "User101",
        time: "10:00 AM",
        notes: "Stress Management",
        type: "Video Call",
        status: "Upcoming",
      },
      {
        id: "User202",
        time: "12:30 PM",
        notes: "Anxiety Support",
        type: "Chat",
        status: "Upcoming",
      },
      {
        id: "User303",
        time: "3:00 PM",
        notes: "Depression Counselling",
        type: "Video Call",
        status: "Rescheduled",
      },
    ];
    setBookings(todayBookings);
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Counsellor Dashboard
      </h1>

      {/* Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-blue-100 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Today’s Sessions</h2>
          <p className="text-2xl">{bookings.length}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Upcoming</h2>
          <p className="text-2xl">
            {bookings.filter((b) => b.status === "Upcoming").length}
          </p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Rescheduled</h2>
          <p className="text-2xl">
            {bookings.filter((b) => b.status === "Rescheduled").length}
          </p>
        </div>
      </div>

      {/* Booking List */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Today’s Bookings</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Session ID</th>
              <th className="border p-2">Time</th>
              <th className="border p-2">Notes</th>
              <th className="border p-2">Type</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index} className="text-center">
                {/* Anonymous user IDs only */}
                <td className="border p-2 font-mono">{booking.id}</td>
                <td className="border p-2">{booking.time}</td>
                <td className="border p-2">{booking.notes}</td>
                <td className="border p-2">{booking.type}</td>
                <td
                  className={`border p-2 ${
                    booking.status === "Upcoming"
                      ? "text-green-600"
                      : booking.status === "Rescheduled"
                      ? "text-yellow-600"
                      : "text-gray-600"
                  }`}
                >
                  {booking.status}
                </td>
                <td className="border p-2">
                  <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Join Session
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CounsellorDashboard;
