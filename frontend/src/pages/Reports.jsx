import { useState } from "react";

export default function StudentReports() {
  const [reports, setReports] = useState([
    {
      id: 1,
      studentId: "STU123",
      counsellor: "Dr. Smith",
      feedback: "Student showed improvement, anxiety levels reduced.",
      recommendations: "Continue with breathing exercises and daily journaling.",
    },
    {
      id: 2,
      studentId: "STU456",
      counsellor: "Dr. Patel",
      feedback: "Student still facing stress before exams.",
      recommendations: "Advised short breaks and regular meditation.",
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Student Reports 📑
      </h1>

      <div className="bg-white shadow-md rounded-xl p-6">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border p-3">Student ID</th>
              <th className="border p-3">Counsellor</th>
              <th className="border p-3">Feedback</th>
              <th className="border p-3">Recommendations</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r) => (
              <tr key={r.id} className="hover:bg-gray-50">
                <td className="border p-3">{r.studentId}</td>
                <td className="border p-3">{r.counsellor}</td>
                <td className="border p-3">{r.feedback}</td>
                <td className="border p-3">{r.recommendations}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
