import React, { useState } from "react";

const StudentReport = () => {
  const [reports, setReports] = useState([]);
  const [form, setForm] = useState({
    sessionId: "",
    studentId: "",
    feedback: "",
    recommendations: "",
    progress: "3", // default neutral
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setReports([...reports, form]);
    setForm({
      sessionId: "",
      studentId: "",
      date: "",
      time: "",
      duration: "",
      feedback: "",
      notes: "",
      recommendations: "",
      progress: "3",
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Student Session Report</h1>

      {/* Form Section */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 mb-8 space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="sessionId"
            value={form.sessionId}
            onChange={handleChange}
            placeholder="Session ID"
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="studentId"
            value={form.studentId}
            onChange={handleChange}
            placeholder="Student Anonymous ID / Roll No"
            className="border p-2 rounded"
            required
          />
        </div>

        <textarea
          name="feedback"
          value={form.feedback}
          onChange={handleChange}
          placeholder="Feedback"
          className="border p-2 rounded w-full"
          rows="3"
          required
        />


        <textarea
          name="recommendations"
          value={form.recommendations}
          onChange={handleChange}
          placeholder="Recommendations / Next Steps"
          className="border p-2 rounded w-full"
          rows="3"
        />

        {/* Progress/Mood Scale */}
        <div>
          <label className="block font-semibold mb-1">
            Student Progress (1 - low, 5 - high):
          </label>
          <select
            name="progress"
            value={form.progress}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="1">😟 1 - Very Low</option>
            <option value="2">😕 2 - Low</option>
            <option value="3">😐 3 - Neutral</option>
            <option value="4">🙂 4 - Good</option>
            <option value="5">😄 5 - Excellent</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Save Report
        </button>
      </form>

    </div>
  );
};

export default StudentReport;
