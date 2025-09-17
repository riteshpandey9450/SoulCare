import React, { useState } from "react";
import { 
  User, 
  Calendar, 
  Clock, 
  MessageCircle, 
  Target, 
  Save, 
  AlertCircle, 
  CheckCircle,
  Star,
  FileText,
  Activity,
  TrendingUp,
  Heart,
  Brain,
  Shield,
  Plus,
  Eye,
  Edit3,
  Trash2,
  X,
  Download,
  Printer
} from "lucide-react";

const StudentReport = () => {
  const [reports, setReports] = useState([
    {
      id: 1,
      studentId: "STU123",
      date: "2024-03-15",
      feedback: "Student showed significant improvement in managing anxiety levels during our session.",
      recommendations: "Continue with mindfulness exercises and schedule follow-up in two weeks.",
      progress: "Improve",
      counselorName: "Dr. Smith"
    }
  ]);

  const [form, setForm] = useState({
    sessionId: "",
    studentId: "",
    date: "",
    time: "",
    duration: "60",
    feedback: "",
    recommendations: "",
    progress: "3",
    sessionType: "Individual",
    counselorName: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showReports, setShowReports] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.sessionId.trim()) {
      newErrors.sessionId = "Session ID is required";
    }
    
    if (!form.studentId.trim()) {
      newErrors.studentId = "Student ID is required";
    }
    
    if (!form.date) {
      newErrors.date = "Session date is required";
    }
    
    if (!form.time) {
      newErrors.time = "Session time is required";
    }
    
    if (!form.feedback.trim()) {
      newErrors.feedback = "Feedback is required";
    } else if (form.feedback.length < 20) {
      newErrors.feedback = "Feedback must be at least 20 characters";
    }
    
    if (!form.recommendations.trim()) {
      newErrors.recommendations = "Recommendations are required";
    } else if (form.recommendations.length < 15) {
      newErrors.recommendations = "Recommendations must be at least 15 characters";
    }
    
    if (!form.counselorName.trim()) {
      newErrors.counselorName = "Counselor name is required";
    }
    
    return newErrors;
  };

const handleChange = (e) => {
  const { name, value, selectionStart, selectionEnd } = e.target;

  setForm((prev) => {
    const updated = { ...prev, [name]: value };

    // Ensure cursor position is restored
    requestAnimationFrame(() => {
      if (document.activeElement.name === name) {
        document.activeElement.setSelectionRange(selectionStart, selectionEnd);
      }
    });

    return updated;
  });
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setIsSubmitting(false);
      return;
    }
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (editingId) {
      setReports(prev => prev.map(report => 
        report.id === editingId 
          ? { ...form, id: editingId }
          : report
      ));
      setEditingId(null);
    } else {
      const newReport = {
        ...form,
        id: Date.now()
      };
      setReports(prev => [...prev, newReport]);
    }
    
    // Reset form
    setForm({
      sessionId: "",
      studentId: "",
      date: "",
      time: "",
      duration: "60",
      feedback: "",
      recommendations: "",
      progress: "3",
      sessionType: "Individual",
      counselorName: ""
    });
    
    setErrors({});
    setIsSubmitting(false);
  };

  const handleEdit = (report) => {
    setForm(report);
    setEditingId(report.id);
    window.scrollTo(0, 0);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this report?")) {
      setReports(prev => prev.filter(report => report.id !== id));
    }
  };

  const cancelEdit = () => {
    setForm({
      sessionId: "",
      studentId: "",
      date: "",
      time: "",
      duration: "60",
      feedback: "",
      recommendations: "",
      progress: "3",
      sessionType: "Individual",
      counselorName: ""
    });
    setEditingId(null);
    setErrors({});
  };

  const getProgressEmoji = (progress) => {
    const progressMap = {
      "1": "😟",
      "2": "😕", 
      "3": "😐",
      "4": "🙂",
      "5": "😄"
    };
    return progressMap[progress] || "😐";
  };

  const getProgressColor = (progress) => {
    const colorMap = {
      "1": "from-red-400 to-red-600",
      "2": "from-orange-400 to-orange-600",
      "3": "from-yellow-400 to-yellow-600", 
      "4": "from-green-400 to-green-600",
      "5": "from-emerald-400 to-emerald-600"
    };
    return colorMap[progress] || "from-gray-400 to-gray-600";
  };

  const FormField = ({ label, error, children, required = false }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error && (
        <div className="flex items-center gap-1 text-red-600 text-sm">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}
    </div>
  );

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Layer */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        {/* Blue Patches */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-blue-400 rounded-full opacity-40 -translate-y-1/2 translate-x-1/3" />
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-gradient-to-br from-sky-100 to-sky-400 rounded-full opacity-30 -translate-x-1/2" />
        <div className="absolute bottom-0 right-3/4 w-72 h-72 bg-gradient-to-tr from-indigo-100 to-indigo-400 rounded-full opacity-35 translate-y-1/3" />
        <div className="absolute bottom-1/3 left-3/4 w-64 h-64 bg-gradient-to-bl from-cyan-100 to-cyan-400 rounded-full opacity-30" />
        <div className="absolute top-5/7 right-1/4 w-56 h-56 bg-gradient-to-tl from-blue-100 to-blue-400 rounded-full opacity-25" />
      </div>

      {/* Content */}
      <div className="relative max-w-5xl mx-auto p-4 sm:p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-center mt-2">
            <div className="items-center">
              <h1 className="text-3xl pl-4 sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent mb-2">
                 Session Feedback Report
              </h1>
              <p className="text-gray-600 text-lg">
                Document of counseling sessions and track student progress
              </p>
            </div>
            
          </div>
        </div>

      
        <div className="relative mb-8">
          <div className="absolute inset-0 backdrop-blur-xl bg-gradient-to-br from-white/50 to-blue-50/30 rounded-2xl" />
          <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-blue-100 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl text-white">
                <Plus className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {editingId ? 'Edit Session Report' : 'New Session Report'}
                </h2>
                <p className="text-gray-600">Fill in the session details and feedback</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Session Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              

                <FormField label="Student ID" error={errors.studentId} required>
                  <input
                    type="text"
                    name="studentId"
                    value={form.studentId}
                    onChange={handleChange}
                    placeholder="e.g., STU123"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80"
                  />
                </FormField>

                <FormField label="Counselor Name" error={errors.counselorName} required>
                  <input
                    type="text"
                    name="counselorName"
                    value={form.counselorName}
                    onChange={handleChange}
                    placeholder="e.g., Dr. Smith"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80"
                  />
                </FormField>

                <FormField label="Session Date" error={errors.date} required>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80"
                  />
                </FormField>

             

                <FormField label="Student Progress">
                  <select
                    name="progress"
                    value={form.progress}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80"
                  >
                    <option value="1">Improve</option>
                    <option value="3">Neutral/Stable</option>
                    <option value="4">Need Support</option>
                  </select>
                </FormField>
              </div>

              {/* Feedback Section */}
              <FormField label="Session Feedback" error={errors.feedback} required>
                <textarea
                  name="feedback"
                  value={form.feedback}
                  onChange={handleChange}
                  placeholder="Describe the session, student's behavior, key insights, and observations..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 min-h-[120px] resize-vertical"
                  rows="5"
                />
                <div className="text-right text-sm text-gray-500 mt-1">
                  {form.feedback.length}/500 characters
                </div>
              </FormField>

              <FormField label="Recommendations And Next Steps" error={errors.recommendations} required>
                <textarea
                  name="recommendations"
                  value={form.recommendations}
                  onChange={handleChange}
                  placeholder="Outline recommended actions, follow-up plans, resources, or interventions..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 min-h-[120px] resize-vertical"
                  rows="5"
                />
                <div className="text-right text-sm text-gray-500 mt-1">
                  {form.recommendations.length}/500 characters
                </div>
              </FormField>

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-200 transition-all transform hover:scale-105 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-5 w-5" />
                      {editingId ? 'Update Report' : 'Save Report'}
                    </>
                  )}
                </button>
                
                {editingId && (
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                  >
                    <X className="h-5 w-5 inline mr-2" />
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default StudentReport;