import React, { useState, useEffect } from "react";
import { Calendar, Clock, User, GraduationCap, Award, ChevronRight, Sparkles, Shield, Brain, Heart, Star, CheckCircle, Video, MessageCircle, Phone, ArrowLeft } from 'lucide-react';

export default function BookingPage() {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [slot, setSlot] = useState("");
  const [issueNote, setIssueNote] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [sessionType, setSessionType] = useState("video");
  const [step, setStep] = useState(1);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const doctors = [
    {
      id: "D001",
      name: "Dr. Sarah Smith",
      specialization: "Anxiety & Stress Management",
      education: "PhD in Clinical Psychology, Harvard",
      experience: "10 years",
      rating: 4.9,
      sessions: 1250,
      languages: ["English", "Spanish"],
      image: "https://i.pravatar.cc/150?img=47",
      slots: ["10:00 AM", "11:00 AM", "2:00 PM", "3:30 PM"],
      tags: ["CBT", "Mindfulness", "EMDR"],
      color: "from-blue-400 to-blue-600"
    },
    {
      id: "D002",
      name: "Dr. Raj Patel",
      specialization: "Depression & Mood Disorders",
      education: "M.Phil. Psychiatry, Johns Hopkins",
      experience: "8 years",
      rating: 4.8,
      sessions: 980,
      languages: ["English", "Hindi"],
      image: "https://i.pravatar.cc/150?img=12",
      slots: ["11:30 AM", "1:00 PM", "4:00 PM", "5:30 PM"],
      tags: ["DBT", "Psychodynamic", "IPT"],
      color: "from-sky-400 to-sky-600"
    },
    {
      id: "D003",
      name: "Dr. Emily Chen",
      specialization: "Student Wellness & Performance",
      education: "PsyD, Stanford University",
      experience: "12 years",
      rating: 4.95,
      sessions: 2100,
      languages: ["English", "Mandarin"],
      image: "https://i.pravatar.cc/150?img=26",
      slots: ["10:30 AM", "3:00 PM", "5:30 PM", "7:00 PM"],
      tags: ["ACT", "Solution-Focused", "Coaching"],
      color: "from-indigo-400 to-indigo-600"
    },
    {
      id: "D004",
      name: "Dr. Michael Kumar",
      specialization: "Sleep & Behavioral Issues",
      education: "MD Psychiatry, Yale",
      experience: "9 years",
      rating: 4.7,
      sessions: 850,
      languages: ["English", "Tamil"],
      image: "https://i.pravatar.cc/150?img=52",
      slots: ["9:00 AM", "1:30 PM", "6:00 PM", "8:00 PM"],
      tags: ["Sleep Therapy", "Behavioral", "Medication"],
      color: "from-cyan-400 to-cyan-600"
    },
  ];

  const sessionTypes = [
    { type: "video", icon: <Video className="w-5 h-5" />, label: "Video Call", desc: "Face-to-face connection" },
    { type: "voice", icon: <Phone className="w-5 h-5" />, label: "Voice Call", desc: "Audio-only session" },
    { type: "chat", icon: <MessageCircle className="w-5 h-5" />, label: "Text Chat", desc: "Written conversation" }
  ];

  const handleDoctorSelection = (doctor) => {
    setSelectedDoctor(doctor);
    // Clear downstream selections when choosing another doctor
    setSlot("");
    setIssueNote("");
    setConfirmation("");
    setStep(2);
  };

  const handleBooking = () => {
    if (!selectedDoctor || !slot || !issueNote.trim()) {
      alert("Please complete all required fields.");
      return;
    }

    const meetingId = Math.random().toString(36).substring(7).toUpperCase();
    const meetingLink = `https://mindcare-platform.com/session/${meetingId}`;

    setConfirmation({
      doctor: selectedDoctor,
      slot: slot,
      date: selectedDate,
      type: sessionType,
      note: issueNote,
      link: meetingLink,
      id: meetingId
    });
    setStep(4);
  };

  const resetBooking = () => {
    setSelectedDoctor(null);
    setSlot("");
    setIssueNote("");
    setConfirmation("");
    setStep(1);
    setSessionType("video");
  };

  // --- Step validation helpers ---
  const isStepCompleted = (n) => {
    if (n === 1) return selectedDoctor !== null;
    if (n === 2) return selectedDoctor !== null && slot !== "" && selectedDate;
    if (n === 3) return isStepCompleted(2) && issueNote.trim() !== "";
    if (n === 4) return confirmation && confirmation.id;
    return false;
  };

  const canGoToStep = (target) => {
    // allow going back always (handled by caller), but to go forward
    // ensure ALL previous steps are completed
    for (let i = 1; i < target; i++) {
      if (!isStepCompleted(i)) return false;
    }
    return true;
  };

  const stepsMeta = [
    { num: 1, label: "Choose Therapist" },
    { num: 2, label: "Select Time" },
    { num: 3, label: "Share Context" },
    { num: 4, label: "Confirmation" }
  ];

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background Pattern with Blue Patches - matching homepage */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full" style={{
            backgroundImage: `linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-blue-400 rounded-full opacity-40 -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-gradient-to-br from-sky-100 to-sky-400 rounded-full opacity-30 -translate-x-1/2"></div>
        <div className="absolute bottom-0 right-3/4 w-72 h-72 bg-gradient-to-tr from-indigo-100 to-indigo-400 rounded-full opacity-35 translate-y-1/3"></div>
        <div className="absolute bottom-1/3 left-3/4 w-64 h-64 bg-gradient-to-bl from-cyan-100 to-cyan-400 rounded-full opacity-30"></div>
      </div>

      <div className="relative z-10 px-6 py-12">
        {/* Wider container that stretches more to the right */}
        <div className="max-w-[90rem] mx-auto ml-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-50 backdrop-blur-xl rounded-full border border-blue-200 mb-6">
              <Shield className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-gray-700 font-medium">100% Confidential & Secure</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gray-900">Book Your </span>
              <span className="bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">Wellness Session</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Connect with licensed mental health professionals who understand student life
            </p>
          </div>

          {/* Progress Steps - clickable, validated */}
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center max-w-4xl w-full justify-between">
              {stepsMeta.map((s, i) => {
                const clickable = s.num <= step || canGoToStep(s.num);
                return (
                  <div
                    key={s.num}
                    className={`flex items-center ${clickable ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'}`}
                    onClick={() => {
                      if (s.num <= step) return setStep(s.num); // always allow going back / current
                      if (canGoToStep(s.num)) return setStep(s.num);
                      // otherwise, give gentle feedback
                      // alert('Please complete previous steps before moving here.');
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        if (s.num <= step) return setStep(s.num);
                        if (canGoToStep(s.num)) return setStep(s.num);
                        alert('Please complete previous steps before moving here.');
                      }
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="flex flex-col items-center">
                      <div className={`flex items-center justify-center w-12 h-12 rounded-full font-semibold transition-all ${
                        step >= s.num 
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg' 
                          : 'bg-white/70 backdrop-blur-sm border-2 border-blue-200 text-gray-500'
                      }`}>
                        {step > s.num ? <CheckCircle className="w-6 h-6" /> : s.num}
                      </div>
                      <span className={`mt-2 text-sm font-medium ${
                        step >= s.num ? 'text-blue-600' : 'text-gray-500'
                      }`}>
                        {s.label}
                      </span>
                    </div>
                    {i < stepsMeta.length - 1 && (
                      <div className={`w-24 h-1 mx-4 rounded-full transition-all ${
                        step > s.num ? 'bg-gradient-to-r from-blue-400 to-blue-500' : 'bg-blue-100'
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 1: Doctor Selection */}
          {step === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
              {doctors.map((doc) => (
                <div key={doc.id} className="relative group">
                  <div className="absolute inset-0 backdrop-blur-2xl bg-gradient-to-br from-white/50 to-blue-50/30 rounded-2xl transform scale-95 group-hover:scale-100 transition-transform"></div>
                  <div className="relative bg-white/70 backdrop-blur-sm rounded-2xl p-6 border-2 border-blue-100 hover:border-blue-300 transition-all hover:shadow-2xl transform hover:-translate-y-1">
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <img
                          src={doc.image}
                          alt={doc.name}
                          className="w-20 h-20 rounded-2xl object-cover border-2 border-white shadow-lg"
                        />
                        <div className={`absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r ${doc.color} rounded-full flex items-center justify-center`}>
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900">{doc.name}</h3>
                        <p className="text-sm text-blue-600 font-medium mb-1">{doc.specialization}</p>
                        <p className="text-xs text-gray-500 mb-2">{doc.education}</p>
                        
                        <div className="flex items-center gap-3 mb-3">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-semibold">{doc.rating}</span>
                          </div>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-600">{doc.sessions} sessions</span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-600">{doc.experience}</span>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-3">
                          {doc.tags.map((tag) => (
                            <span key={tag} className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full font-medium">
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="text-xs text-gray-500 mb-4">
                          Speaks: {doc.languages.join(", ")}
                        </div>

                        {/* Individual button for each doctor */}
                        <button
                          onClick={() => handleDoctorSelection(doc)}
                          className={`w-full px-6 py-3 bg-gradient-to-r ${doc.color} text-white rounded-xl font-semibold hover:shadow-xl transition-all flex items-center justify-center gap-2 group`}
                        >
                          Select {doc.name.split(' ')[1]}
                          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Step 2: Time Selection */}
          {step === 2 && selectedDoctor && (
            <div className="max-w-5xl mx-auto">
              <button 
                onClick={() => setStep(1)}
                className="mb-6 flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Change therapist
              </button>

              <div className="relative">
                <div className="absolute inset-0 backdrop-blur-3xl bg-gradient-to-br from-blue-50/50 to-white/30 rounded-3xl"></div>
                <div className="relative bg-white/70 backdrop-blur-sm rounded-3xl border border-blue-100 p-8 shadow-xl">
                  <div className="flex items-center gap-4 mb-6">
                    <img src={selectedDoctor.image} alt={selectedDoctor.name} className="w-16 h-16 rounded-2xl" />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{selectedDoctor.name}</h3>
                      <p className="text-blue-600">{selectedDoctor.specialization}</p>
                    </div>
                  </div>

                  {/* Session Type Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Session Type</label>
                    <div className="grid grid-cols-3 gap-3">
                      {sessionTypes.map((type) => (
                        <button
                          key={type.type}
                          onClick={() => setSessionType(type.type)}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            sessionType === type.type
                              ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-sky-50 shadow-lg'
                              : 'border-blue-100 bg-white/50 hover:border-blue-300'
                          }`}
                        >
                          <div className={`flex justify-center mb-2 ${
                            sessionType === type.type ? 'text-blue-600' : 'text-gray-500'
                          }`}>
                            {type.icon}
                          </div>
                          <div className="text-sm font-semibold text-gray-800">{type.label}</div>
                          <div className="text-xs text-gray-500">{type.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Date Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Select Date</label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 rounded-xl border-2 border-blue-100 focus:border-blue-400 focus:outline-none bg-white/50 backdrop-blur-sm"
                    />
                  </div>

                  {/* Time Slots */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Available Time Slots</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {selectedDoctor.slots.map((s) => (
                        <button
                          key={s}
                          onClick={() => setSlot(s)}
                          className={`px-4 py-3 rounded-xl font-medium transition-all ${
                            slot === s
                              ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg transform scale-105'
                              : 'bg-white/70 border-2 border-blue-100 hover:border-blue-300 text-gray-700'
                          }`}
                        >
                          <Clock className="w-4 h-4 inline mr-2" />
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {slot && (
                    <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                      <p className="text-green-700 font-medium">
                        ✅ Selected: {selectedDate} at {slot} ({sessionType} session)
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Issue Note */}
          {step === 3 && slot && (
            <div className="max-w-4xl mx-auto">
              <button 
                onClick={() => setStep(2)}
                className="mb-6 flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Change time
              </button>

              <div className="relative">
                <div className="absolute inset-0 backdrop-blur-3xl bg-gradient-to-br from-blue-50/50 to-white/30 rounded-3xl"></div>
                <div className="relative bg-white/70 backdrop-blur-sm rounded-3xl border border-blue-100 p-8 shadow-xl">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Almost there!</h3>
                    <p className="text-gray-600">Help {selectedDoctor.name} prepare for your session</p>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      What would you like to discuss? (Required)
                    </label>
                    <textarea
                      value={issueNote}
                      onChange={(e) => setIssueNote(e.target.value)}
                      placeholder="e.g., I've been feeling anxious about upcoming exams and having trouble sleeping..."
                      className="w-full border-2 border-blue-100 rounded-xl px-4 py-3 h-32 focus:border-blue-400 focus:outline-none bg-white/50 backdrop-blur-sm resize-none"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      <Shield className="w-3 h-3 inline mr-1" />
                      Your information is confidential and will only be shared with your therapist
                    </p>
                  </div>

                  <div className="bg-blue-50 rounded-xl p-4 mb-6">
                    <h4 className="font-semibold text-gray-800 mb-2">Session Summary:</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>• Therapist: {selectedDoctor.name}</p>
                      <p>• Date: {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      <p>• Time: {slot}</p>
                      <p>• Type: {sessionTypes.find(t => t.type === sessionType)?.label}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {step === 4 && confirmation && (
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                <div className="absolute inset-0 backdrop-blur-3xl bg-gradient-to-br from-green-50/50 to-blue-50/30 rounded-3xl"></div>
                <div className="relative bg-white/70 backdrop-blur-sm rounded-3xl border border-green-200 p-8 shadow-xl">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full mb-4">
                      <CheckCircle className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Session Confirmed!</h2>
                    <p className="text-gray-600">Your wellness journey continues</p>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-sky-50 rounded-2xl p-6 mb-6">
                    <div className="flex items-center gap-4 mb-4">
                      <img src={confirmation.doctor.image} alt={confirmation.doctor.name} className="w-16 h-16 rounded-2xl" />
                      <div>
                        <h3 className="font-bold text-gray-900">{confirmation.doctor.name}</h3>
                        <p className="text-blue-600 text-sm">{confirmation.doctor.specialization}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-blue-600" />
                        <span className="text-gray-700">{new Date(confirmation.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-blue-600" />
                        <span className="text-gray-700">{confirmation.slot}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        {sessionTypes.find(t => t.type === confirmation.type)?.icon}
                        <span className="text-gray-700">{sessionTypes.find(t => t.type === confirmation.type)?.label}</span>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-white/70 rounded-xl">
                      <p className="text-sm font-semibold text-gray-700 mb-1">Session ID:</p>
                      <p className="font-mono text-blue-600">{confirmation.id}</p>
                    </div>

                    <div className="mt-4 p-3 bg-white/70 rounded-xl">
                      <p className="text-sm font-semibold text-gray-700 mb-1">Session Link:</p>
                      <a href={confirmation.link} className="text-blue-600 hover:underline text-sm break-all">
                        {confirmation.link}
                      </a>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                    <p className="text-sm text-yellow-800">
                      💡 <strong>Tip:</strong> You'll receive a reminder email 24 hours and 1 hour before your session.
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={resetBooking}
                      className="flex-1 px-6 py-3 bg-white border-2 border-blue-200 text-gray-700 rounded-full font-semibold hover:bg-blue-50 transition-all"
                    >
                      Book Another Session
                    </button>
                    <button className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full font-semibold hover:shadow-xl transition-all">
                      Go to Dashboard
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons - Only show back button for steps 2-4 */}
          {step > 1 && step < 4 && (
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={() => setStep(step - 1)}
                className="px-8 py-3 bg-white/70 backdrop-blur-sm border-2 border-blue-200 text-gray-700 rounded-full font-semibold hover:bg-blue-50 transition-all"
              >
                Back
              </button>
              {((step === 2 && slot) || (step === 3 && issueNote.trim())) && (
                <button
                  onClick={() => step === 3 ? handleBooking() : setStep(step + 1)}
                  className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full font-semibold hover:shadow-xl transition-all flex items-center gap-2 group"
                >
                  {step === 3 ? 'Confirm Booking' : 'Continue'}
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
