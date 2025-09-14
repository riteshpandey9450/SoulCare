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
    setProfile(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Enhanced Background with Grid Pattern and Blue Patches */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full" style={{
            backgroundImage: `linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        {/* Blue Patches - Enhanced with Animation */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-blue-400 rounded-full opacity-40 -translate-y-1/2 translate-x-1/3 animate-pulse"></div>
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-gradient-to-br from-sky-100 to-sky-400 rounded-full opacity-30 -translate-x-1/2 animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 right-3/4 w-72 h-72 bg-gradient-to-tr from-indigo-100 to-indigo-400 rounded-full opacity-35 translate-y-1/3 animate-pulse delay-2000"></div>
        <div className="absolute bottom-1/3 left-3/4 w-64 h-64 bg-gradient-to-bl from-cyan-100 to-cyan-400 rounded-full opacity-30 animate-pulse delay-3000"></div>
        <div className="absolute top-5/7 right-1/4 w-56 h-56 bg-gradient-to-tl from-blue-100 to-blue-400 rounded-full opacity-25 animate-pulse delay-4000"></div>
        
        {/* Additional floating elements */}
        <div className="absolute top-1/3 left-1/2 w-40 h-40 bg-gradient-to-r from-violet-100 to-purple-300 rounded-full opacity-20 animate-pulse delay-500"></div>
        <div className="absolute bottom-1/4 right-1/2 w-48 h-48 bg-gradient-to-l from-teal-100 to-emerald-300 rounded-full opacity-25 animate-pulse delay-1500"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 p-6 max-w-6xl mx-auto">
        {/* Enhanced Header with Glassmorphism */}


        {profile ? (
          /* Enhanced Profile Display */
          <div className="space-y-8">
            {/* Main Profile Card */}
            <div className="backdrop-blur-2xl bg-white/15 border border-white/30 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-violet-500/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-500/10 to-cyan-500/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
              
              <div className="relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
                  <div className="flex items-center space-x-6">
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full blur-lg opacity-50 group-hover:opacity-70 transition-opacity"></div>
                      <div className="relative w-28 h-28 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 rounded-full flex items-center justify-center shadow-2xl backdrop-blur-sm border-2 border-white/40">
                        <span className="text-3xl font-bold text-white">{profile.name.charAt(0)}</span>
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full border-4 border-white/60 backdrop-blur-sm flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h2 className="text-4xl font-bold text-gray-800 tracking-tight">{profile.name}</h2>
                      <p className="text-gray-600 text-lg font-medium">{profile.stream} • {profile.year}</p>
                      <div className="inline-flex items-center backdrop-blur-sm bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2">
                        <svg className="w-4 h-4 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <span className="text-blue-700 font-semibold text-sm">{profile.college}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleEdit}
                    className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 text-white rounded-2xl font-semibold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 backdrop-blur-sm border border-white/20 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative z-10 flex items-center space-x-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      <span>Edit Profile</span>
                    </span>
                  </button>
                </div>
              </div>

                {/* Profile Details Grid */}
                <div className="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 gap-6">
                {[
                    { label: "Roll Number", value: profile.rollNo, icon: "🎓", gradient: "from-blue-500 to-cyan-500", bgGradient: "from-blue-50 to-cyan-50" },
                    { label: "Mobile", value: profile.mobile, icon: "📱", gradient: "from-cyan-500 to-teal-500", bgGradient: "from-cyan-50 to-teal-50" },
                    { label: "Language", value: profile.language, icon: "🌐", gradient: "from-teal-500 to-emerald-500", bgGradient: "from-teal-50 to-emerald-50" },
                    { label: "Notifications", value: profile.notifications ? "Enabled" : "Disabled", icon: "🔔", gradient: "from-purple-500 to-violet-500", bgGradient: "from-purple-50 to-violet-50" },
                    { label: "Privacy", value: profile.privacy, icon: "🔒", gradient: "from-violet-500 to-indigo-500", bgGradient: "from-violet-50 to-indigo-50" },
                    { label: "Status", value: "Active", icon: "✅", gradient: "from-emerald-500 to-green-500", bgGradient: "from-emerald-50 to-green-50" }
                ].map((item, index) => (
                    <div key={index} className={`group backdrop-blur-xl bg-gradient-to-br ${item.bgGradient} bg-opacity-30 border border-white/30 rounded-3xl p-6 hover:bg-opacity-50 transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:scale-105 relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                        <div className={`w-14 h-14 bg-gradient-to-r ${item.gradient} rounded-2xl flex items-center justify-center shadow-lg backdrop-blur-sm border border-white/40 group-hover:scale-110 transition-transform duration-300`}>
                            <span className="text-2xl filter drop-shadow-sm">{item.icon}</span>
                        </div>
                        <div className={`w-2 h-2 bg-gradient-to-r ${item.gradient} rounded-full animate-pulse`}></div>
                        </div>
                        <h3 className="font-bold text-gray-800 text-lg mb-2 tracking-tight">{item.label}</h3>
                        <p className="text-gray-700 text-xl font-semibold">{item.value}</p>
                        <div className={`mt-3 w-full h-1 bg-gradient-to-r ${item.gradient} rounded-full opacity-30 group-hover:opacity-60 transition-opacity duration-300`}></div>
                    </div>
                    </div>
                ))}
                </div>
            </div>
          </div>
        ) : (
          /* Enhanced Profile Form */
          <div className="space-y-8">
            {/* Form Introduction Card */}
            <div className="backdrop-blur-2xl bg-white/15 border border-white/30 rounded-3xl p-8 shadow-2xl text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-violet-500/5"></div>
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full mb-6 shadow-xl">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h2 className="text-4xl font-bold text-gray-800 mb-4 tracking-tight">Complete Your Profile</h2>
                <p className="text-gray-700 text-xl max-w-2xl mx-auto leading-relaxed">
                  Fill in your information to get started with your personalized healthcare journey
                </p>
              </div>

                {/* Enhanced Form */}
                <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information Section */}
                <div className="backdrop-blur-2xl bg-white/15 border border-white/30 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
                    <div className="flex items-center space-x-4 mb-8">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-800 tracking-tight">Personal Information</h3>
                    </div>

                    <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-8">
                    {[
                        { name: "name", label: "Full Name", type: "text", placeholder: "Enter your full name", gradient: "from-blue-500/10 to-cyan-500/10" },
                        { name: "rollNo", label: "Roll Number", type: "text", placeholder: "Enter roll number", gradient: "from-cyan-500/10 to-teal-500/10" },
                        { name: "college", label: "College Name", type: "text", placeholder: "Enter college name", gradient: "from-teal-500/10 to-emerald-500/10" },
                        { name: "stream", label: "Stream", type: "text", placeholder: "e.g., Computer Science", gradient: "from-emerald-500/10 to-green-500/10" },
                        { name: "mobile", label: "Mobile Number", type: "tel", placeholder: "Enter mobile number", gradient: "from-violet-500/10 to-purple-500/10" }
                    ].map((field, index) => (
                        <div key={index} className="space-y-3 group">
                        <label className="block text-sm font-bold text-gray-700 mb-2">{field.label}</label>
                        <div className="relative">
                            <input
                            type={field.type}
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleChange}
                            required
                            className="w-full p-5 bg-white/30 backdrop-blur-sm border border-white/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 placeholder-gray-500 text-gray-800 font-medium group-hover:bg-white/40"
                            placeholder={field.placeholder}
                            />
                            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${field.gradient} pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                        </div>
                        </div>
                    ))}

                    {/* Year Select */}
                    <div className="space-y-3 group">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Academic Year</label>
                        <div className="relative">
                        <select
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            required
                            className="w-full p-5 bg-white/30 backdrop-blur-sm border border-white/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 text-gray-800 font-medium group-hover:bg-white/40"
                        >
                            <option value="">Select Year</option>
                            <option value="1st">1st Year</option>
                            <option value="2nd">2nd Year</option>
                            <option value="3rd">3rd Year</option>
                            <option value="4th">4th Year</option>
                        </select>
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-violet-500/10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                    </div>
                    </div>
                </div>

                {/* Preferences Section */}
                <div className="backdrop-blur-2xl bg-white/15 border border-white/30 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-violet-500"></div>
                    <div className="flex items-center space-x-4 mb-8">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-2xl flex items-center justify-center shadow-lg">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                        </svg>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-800 tracking-tight">Preferences & Settings</h3>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                    {/* Language Selection */}
                    <div className="space-y-3 group">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Preferred Language</label>
                        <div className="relative">
                        <select
                            name="language"
                            value={formData.language}
                            onChange={handleChange}
                            className="w-full p-5 bg-white/30 backdrop-blur-sm border border-white/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-300 text-gray-800 font-medium group-hover:bg-white/40"
                        >
                            <option value="English">English</option>
                            <option value="Hindi">Hindi</option>
                            <option value="Bengali">Bengali</option>
                            <option value="Tamil">Tamil</option>
                            <option value="Telugu">Telugu</option>
                        </select>
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-teal-500/10 to-cyan-500/10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                    </div>

                    {/* Notifications Toggle */}
                    <div className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-2xl p-6 group hover:bg-white/30 transition-all duration-300">
                        <label className="flex items-center space-x-4 cursor-pointer">
                        <div className="relative">
                            <input
                            type="checkbox"
                            name="notifications"
                            checked={formData.notifications}
                            onChange={handleChange}
                            className="sr-only"
                            />
                            <div className={`w-10 h-10 rounded-2xl border-2 flex items-center justify-center transition-all duration-300 shadow-lg ${formData.notifications ? 'bg-gradient-to-r from-emerald-500 to-green-500 border-emerald-500 scale-110' : 'bg-white/40 border-white/60 hover:border-emerald-300'}`}>
                            {formData.notifications && (
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                            </div>
                        </div>
                        <div>
                            <span className="font-bold text-gray-800 text-lg block">Enable Notifications</span>
                            {/* <p className="text-sm text-gray-600">Receive updates</p> */}
                        </div>
                        </label>
                    </div>

                    {/* Privacy Setting */}
                    <div className="space-y-3 group">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Privacy Setting</label>
                        <div className="relative">
                        <select
                            name="privacy"
                            value={formData.privacy}
                            onChange={handleChange}
                            className="w-full p-5 bg-white/30 backdrop-blur-sm border border-white/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-all duration-300 text-gray-800 font-medium group-hover:bg-white/40"
                        >
                            <option value="Public">Public Profile</option>
                            <option value="Private">Private Profile</option>
                        </select>
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500/10 to-purple-500/10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                    </div>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                type="submit"
                className="group relative w-full py-6 px-8 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 text-white rounded-3xl font-bold text-xl shadow-2xl hover:shadow-3xl transform hover:scale-[1.02] transition-all duration-300 overflow-hidden backdrop-blur-sm border border-white/30"
                >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center justify-center space-x-3">
                    <svg className="w-7 h-7 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="tracking-wide">Save Profile & Continue</span>
                </span>
                </button>
                </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;