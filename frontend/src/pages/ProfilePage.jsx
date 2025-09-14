import React, { useState } from "react";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    rollNo: "",
    college: "",
    stream: "",
    year: "",
    mobile: "",
    language: "English",
    notifications: true,
    privacy: "Public",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProfile(formData);
  };

  const handleEdit = () => {
    setProfile(null); // switch back to form mode
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Profile & Settings</h1>

      {/* If profile is already saved → Show profile details */}
      {profile ? (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
          <p><span className="font-semibold">Name:</span> {profile.name}</p>
          <p><span className="font-semibold">Roll No:</span> {profile.rollNo}</p>
          <p><span className="font-semibold">College:</span> {profile.college}</p>
          <p><span className="font-semibold">Stream:</span> {profile.stream}</p>
          <p><span className="font-semibold">Year:</span> {profile.year}</p>
          <p><span className="font-semibold">Mobile:</span> {profile.mobile}</p>
          <p><span className="font-semibold">Email:</span> {profile.email}</p>
          <p><span className="font-semibold">Preferred Language:</span> {profile.language}</p>
          <p><span className="font-semibold">Notifications:</span> {profile.notifications ? "Enabled" : "Disabled"}</p>
          <p><span className="font-semibold">Privacy:</span> {profile.privacy}</p>

          <button
            onClick={handleEdit}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Edit Profile
          </button>
        </div>
      ) : (
        // Profile Form
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-6 space-y-4"
        >
          <div>
            <label className="block font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block font-medium">Roll No</label>
            <input
              type="text"
              name="rollNo"
              value={formData.rollNo}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block font-medium">College Name</label>
            <input
              type="text"
              name="college"
              value={formData.college}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block font-medium">Stream</label>
            <input
              type="text"
              name="stream"
              value={formData.stream}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block font-medium">Year</label>
            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="">Select Year</option>
              <option value="1st">1st Year</option>
              <option value="2nd">2nd Year</option>
              <option value="3rd">3rd Year</option>
              <option value="4th">4th Year</option>
            </select>
          </div>

          <div>
            <label className="block font-medium">Mobile No</label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block font-medium">Preferred Language</label>
            <select
              name="language"
              value={formData.language}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Bengali">Bengali</option>
              <option value="Tamil">Tamil</option>
              <option value="Telugu">Telugu</option>
            </select>
          </div>

          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="notifications"
                checked={formData.notifications}
                onChange={handleChange}
              />
              <span>Enable Notifications</span>
            </label>
          </div>

          <div>
            <label className="block font-medium">Privacy</label>
            <select
              name="privacy"
              value={formData.privacy}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Save Profile
          </button>
        </form>
      )}
    </div>
  );
};

export default Profile;
