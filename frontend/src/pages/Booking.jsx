import { useState } from "react";

export default function BookingPage() {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [slot, setSlot] = useState("");
  const [issueNote, setIssueNote] = useState("");
  const [confirmation, setConfirmation] = useState("");

  const doctors = [
    {
      id: "D001",
      name: "Dr. Smith",
      specialization: "Anxiety",
      education: "PhD in Clinical Psychology",
      experience: "10 years",
      image: "https://via.placeholder.com/100",
      slots: ["10:00 AM", "11:00 AM", "2:00 PM"],
    },
    {
      id: "D002",
      name: "Dr. Patel",
      specialization: "Depression",
      education: "M.Phil. Psychiatry",
      experience: "8 years",
      image: "https://via.placeholder.com/100",
      slots: ["11:30 AM", "1:00 PM", "4:00 PM"],
    },
    {
      id: "D003",
      name: "Dr. Emily",
      specialization: "General Stress",
      education: "PsyD in Counselling Psychology",
      experience: "12 years",
      image: "https://via.placeholder.com/100",
      slots: ["10:30 AM", "3:00 PM", "5:30 PM"],
    },
    {
      id: "D004",
      name: "Dr. Kumar",
      specialization: "Sleep Issues",
      education: "MD Psychiatry",
      experience: "9 years",
      image: "https://via.placeholder.com/100",
      slots: ["9:00 AM", "1:30 PM", "6:00 PM"],
    },
  ];

  const handleBooking = () => {
    if (!selectedDoctor || !slot || !issueNote.trim()) {
      alert("Please select a doctor, slot, and enter your issue note.");
      return;
    }

    // Generate dummy meeting link
    const meetingId = Math.random().toString(36).substring(7).toUpperCase();
    const meetingLink = `https://mindcare-platform.com/session/${meetingId}`;

    setConfirmation(
      `✅ Appointment booked with ${selectedDoctor.name} (${selectedDoctor.specialization}) at ${slot}.
       \n📝 Your Note: ${issueNote}
       \n🔗 Meeting Link: ${meetingLink}`
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Book a Session</h1>

      {/* Doctor Selection */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {doctors.map((doc) => (
          <div
            key={doc.id}
            className={`bg-white shadow-md rounded-xl p-5 border transition hover:shadow-lg cursor-pointer ${
              selectedDoctor?.id === doc.id ? "border-indigo-600" : "border-gray-200"
            }`}
            onClick={() => {
              setSelectedDoctor(doc);
              setSlot(""); // reset slot on doctor change
            }}
          >
            <div className="flex items-center gap-4">
              <img
                src={doc.image}
                alt={doc.name}
                className="w-20 h-20 rounded-full border"
              />
              <div>
                <h2 className="text-lg font-semibold">{doc.name}</h2>
                <p className="text-sm text-gray-600">{doc.specialization}</p>
                <p className="text-xs text-gray-500">{doc.education}</p>
                <p className="text-xs text-gray-500">Experience: {doc.experience}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slot Selection */}
      {selectedDoctor && (
        <div className="w-full max-w-2xl mt-6 bg-white shadow-md rounded-xl p-5">
          <h3 className="text-sm font-medium mb-2">
            Available Slots with {selectedDoctor.name}:
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {selectedDoctor.slots.map((s, idx) => (
              <button
                key={idx}
                onClick={() => setSlot(s)}
                className={`px-3 py-2 rounded-lg text-sm ${
                  slot === s
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Issue Note */}
      {slot && (
        <div className="w-full max-w-2xl mt-6 bg-white shadow-md rounded-xl p-5">
          <label className="block mb-2 font-medium">
            Short Note about your Issue
          </label>
          <textarea
            value={issueNote}
            onChange={(e) => setIssueNote(e.target.value)}
            placeholder="e.g., I have been feeling anxious before exams..."
            className="w-full border rounded-lg px-4 py-2 h-24 focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      )}

      {/* Confirm Button */}
      {slot && issueNote.trim() && (
        <button
          onClick={handleBooking}
          className="mt-6 w-full max-w-2xl bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700"
        >
          Confirm Booking
        </button>
      )}

      {/* Confirmation Message */}
      {confirmation && (
        <div className="mt-6 w-full max-w-2xl p-4 bg-green-100 text-green-700 rounded-lg whitespace-pre-line">
          {confirmation}
        </div>
      )}
    </div>
  );
}
