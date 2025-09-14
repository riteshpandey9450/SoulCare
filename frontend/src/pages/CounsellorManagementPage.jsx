import { useState } from "react";
import { FaTrash, FaPlus } from "react-icons/fa";

export default function CounsellorManagement() {
  const [counsellors, setCounsellors] = useState([
    {
      id: "C001",
      name: "Dr. Smith",
      specialization: "Anxiety",
      experience: "10 years",
      expertise: "Cognitive Behavioral Therapy",
      email: "smith@example.com",
    },
    {
      id: "C002",
      name: "Dr. Emily",
      specialization: "Depression",
      experience: "8 years",
      expertise: "Mindfulness-Based Therapy",
      email: "emily@example.com",
    },
  ]);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    specialization: "",
    experience: "",
    expertise: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (
      !formData.id ||
      !formData.name ||
      !formData.specialization ||
      !formData.experience ||
      !formData.expertise ||
      !formData.email
    ) {
      alert("Please fill all fields before adding.");
      return;
    }
    setCounsellors([...counsellors, formData]);
    setFormData({
      id: "",
      name: "",
      specialization: "",
      experience: "",
      expertise: "",
      email: "",
    });
  };

  const handleDelete = (id) => {
    setCounsellors(counsellors.filter((c) => c.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Counsellor Management
      </h1>

      {/* Add Counsellor Form */}
      <div className="bg-white shadow-md rounded-xl p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Add New Counsellor</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            placeholder="Counsellor ID"
            className="border p-2 rounded-lg"
          />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="border p-2 rounded-lg"
          />
          <input
            type="text"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            placeholder="Specialization"
            className="border p-2 rounded-lg"
          />
          <input
            type="text"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            placeholder="Experience (e.g. 10 years)"
            className="border p-2 rounded-lg"
          />
          <input
            type="text"
            name="expertise"
            value={formData.expertise}
            onChange={handleChange}
            placeholder="Expertise (e.g. CBT, MBSR)"
            className="border p-2 rounded-lg"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="border p-2 rounded-lg"
          />
        </div>
        <button
          onClick={handleAdd}
          className="mt-4 flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          <FaPlus /> Add Counsellor
        </button>
      </div>

      {/* Counsellors List */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Existing Counsellors</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Specialization</th>
              <th className="p-2 border">Experience</th>
              <th className="p-2 border">Expertise</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {counsellors.map((c) => (
              <tr key={c.id} className="text-center">
                <td className="p-2 border">{c.id}</td>
                <td className="p-2 border">{c.name}</td>
                <td className="p-2 border">{c.specialization}</td>
                <td className="p-2 border">{c.experience}</td>
                <td className="p-2 border">{c.expertise}</td>
                <td className="p-2 border">{c.email}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
