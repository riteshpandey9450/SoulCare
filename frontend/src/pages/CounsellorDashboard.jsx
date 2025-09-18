import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  Video,
  MessageCircle,
  Users,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Play,
  User,
  Bell,
  Settings,
  BarChart3,
  Heart,
  Star,
  Filter,
  Search,
  Plus,
  TrendingUp,
  Activity,
  FileText,
  Download,
  Eye,
  ArrowLeft,
  PieChart,
  Calendar as CalendarIcon,
  Target,
  Zap,
  Award,
  TrendingDown,
  Users2,
  Clock3,
  Menu,
  X
} from "lucide-react";

const CounsellorDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSection, setActiveSection] = useState("dashboard");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [reportData, setReportData] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Sample data with more comprehensive information
  useEffect(() => {
    const todayBookings = [
      {
        id: "User101",
        name: "Anonymous User 101",
        time: "10:00 AM",
        notes: "Stress Management - Academic pressure",
        type: "Video Call",
        status: "Upcoming",
        duration: "45 min",
        priority: "Medium",
        sessionCount: 3,
        lastSession: "2 weeks ago",
        totalSessions: 5,
        progress: "Improving",
        nextGoal: "Develop better study habits"
      },
      {
        id: "User202",
        name: "Anonymous User 202",
        time: "12:30 PM",
        notes: "Anxiety Support - Social situations",
        type: "Chat",
        status: "Upcoming",
        duration: "30 min",
        priority: "High",
        sessionCount: 1,
        lastSession: "First session",
        totalSessions: 1,
        progress: "New Patient",
        nextGoal: "Initial assessment complete"
      },
      {
        id: "User303",
        name: "Anonymous User 303",
        time: "3:00 PM",
        notes: "Depression Counselling - Follow-up",
        type: "Video Call",
        status: "Rescheduled",
        duration: "60 min",
        priority: "High",
        sessionCount: 8,
        lastSession: "1 week ago",
        totalSessions: 12,
        progress: "Stable",
        nextGoal: "Continue medication compliance"
      },
      {
        id: "User404",
        name: "Anonymous User 404",
        time: "4:30 PM",
        notes: "Relationship counseling",
        type: "Video Call",
        status: "Completed",
        duration: "45 min",
        priority: "Low",
        sessionCount: 5,
        lastSession: "Today",
        totalSessions: 8,
        progress: "Better",
        nextGoal: "Maintain healthy communication patterns"
      }
    ];
    setBookings(todayBookings);

    // Sample report data
    setReportData({
      weeklyStats: {
        totalSessions: 24,
        completedSessions: 22,
        cancelledSessions: 2,
        averageRating: 4.8,
        totalPatients: 18,
        newPatients: 3
      },
      monthlyTrends: [
        { month: "Jan", sessions: 89, satisfaction: 4.6 },
        { month: "Feb", sessions: 92, satisfaction: 4.7 },
        { month: "Mar", sessions: 98, satisfaction: 4.8 },
        { month: "Apr", sessions: 85, satisfaction: 4.9 }
      ],
      topConcerns: [
        { concern: "Anxiety", count: 12, percentage: 35 },
        { concern: "Depression", count: 8, percentage: 24 },
        { concern: "Stress", count: 7, percentage: 21 },
        { concern: "Relationships", count: 4, percentage: 12 },
        { concern: "Academic", count: 3, percentage: 8 }
      ]
    });
  }, []);

  const filteredBookings = bookings.filter(booking => {
    const matchesFilter = selectedFilter === "all" || booking.status.toLowerCase() === selectedFilter.toLowerCase();
    const matchesSearch = booking.notes.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Upcoming": return "text-blue-600 bg-blue-50 border-blue-200";
      case "Completed": return "text-green-600 bg-green-50 border-green-200";
      case "Rescheduled": return "text-amber-600 bg-amber-50 border-amber-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High": return "text-red-600 bg-red-50 border-red-200";
      case "Medium": return "text-amber-600 bg-amber-50 border-amber-200";
      case "Low": return "text-green-600 bg-green-50 border-green-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const stats = [
    {
      title: "Today's Sessions",
      value: bookings.length.toString(),
      icon: <Calendar className="w-6 h-6" />,
      color: "from-blue-500 to-blue-600",
      change: "+2 from yesterday"
    },
    {
      title: "Upcoming",
      value: bookings.filter(b => b.status === "Upcoming").length.toString(),
      icon: <Clock className="w-6 h-6" />,
      color: "from-sky-500 to-sky-600",
      change: "Next at 10:00 AM"
    },
    {
      title: "Completed",
      value: bookings.filter(b => b.status === "Completed").length.toString(),
      icon: <CheckCircle className="w-6 h-6" />,
      color: "from-green-500 to-green-600",
      change: "85% completion rate"
    },
    {
      title: "This Week",
      value: "24",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "from-indigo-500 to-indigo-600",
      change: "+15% from last week"
    }
  ];

  // Render different sections based on activeSection
  const renderContent = () => {
    switch (activeSection) {
      case "reports":
        return renderReportsSection();
      case "patients":
        return selectedPatient ? renderPatientDetail() : renderPatientsSection();
      default:
        return renderDashboard();
    }
  };

  const renderDashboard = () => (
    <>
      {/* Stats Grid - Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="relative group">
            <div className="absolute inset-0 backdrop-blur-xl bg-gradient-to-br from-white/50 to-blue-50/30 rounded-2xl"></div>
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-blue-100 p-4 lg:p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className={`inline-flex p-3 bg-gradient-to-br ${stat.color} rounded-xl text-white`}>
                  {stat.icon}
                </div>
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <div className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent mb-1">
                {stat.value}
              </div>
              <div className="text-gray-600 font-medium mb-2 text-sm lg:text-base">{stat.title}</div>
              <div className="text-xs text-green-600">{stat.change}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Search and Filter - Responsive */}
      <div className="relative mb-6">
        <div className="absolute inset-0 backdrop-blur-xl bg-gradient-to-r from-white/40 to-blue-50/20 rounded-2xl"></div>
        <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-blue-100 p-4 shadow-lg">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search sessions or user IDs..."
                className="w-full pl-10 pr-4 py-2 border border-blue-200 rounded-full bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                className="w-full sm:w-auto px-4 py-2 border border-blue-200 rounded-full bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                <option value="all">All Sessions</option>
                <option value="upcoming">Upcoming</option>
                <option value="completed">Completed</option>
                <option value="rescheduled">Rescheduled</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Sessions Table - Responsive */}
      <div className="relative">
        <div className="absolute inset-0 backdrop-blur-2xl bg-gradient-to-br from-white/50 to-blue-50/30 rounded-2xl"></div>
        <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-blue-100 shadow-xl overflow-hidden">
          <div className="p-4 lg:p-6 border-b border-blue-100">
            <h2 className="text-lg lg:text-xl font-semibold text-gray-800 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-blue-600" />
              Today's Sessions ({filteredBookings.length})
            </h2>
          </div>

          {/* Mobile Cards View */}
          <div className="block lg:hidden">
            {filteredBookings.map((booking, index) => (
              <div key={index} className="p-4 border-b border-blue-100 last:border-b-0">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full">
                      <User className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-mono text-sm font-medium text-gray-900">{booking.id}</div>
                      <div className="text-xs text-gray-500">Session #{booking.sessionCount}</div>
                    </div>
                  </div>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(booking.status)}`}>
                    {booking.status}
                  </span>
                </div>
                
                <div className="space-y-2 mb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Time</span>
                    <span className="text-sm font-medium">{booking.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Type</span>
                    <div className="flex items-center space-x-1">
                      {booking.type === "Video Call" ? (
                        <Video className="w-3 h-3 text-blue-600" />
                      ) : (
                        <MessageCircle className="w-3 h-3 text-green-600" />
                      )}
                      <span className="text-xs">{booking.type}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Priority</span>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(booking.priority)}`}>
                      {booking.priority}
                    </span>
                  </div>
                </div>

                <div className="text-sm text-gray-700 mb-3">{booking.notes}</div>

                {booking.status === "Upcoming" && (
                  <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-xs font-medium hover:shadow-lg transition-all transform hover:scale-105 flex items-center justify-center">
                    <Play className="w-3 h-3 mr-1" />
                    Join Session
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-50 to-sky-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Session</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Time</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Notes</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Priority</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-100">
                {filteredBookings.map((booking, index) => (
                  <tr key={index} className="hover:bg-blue-25 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full">
                          <User className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-mono text-sm font-medium text-gray-900">{booking.id}</div>
                          <div className="text-xs text-gray-500">Session #{booking.sessionCount} • {booking.lastSession}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{booking.time}</div>
                          <div className="text-xs text-gray-500">{booking.duration}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate" title={booking.notes}>
                        {booking.notes}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        {booking.type === "Video Call" ? (
                          <Video className="w-4 h-4 text-blue-600" />
                        ) : (
                          <MessageCircle className="w-4 h-4 text-green-600" />
                        )}
                        <span className="text-sm text-gray-700">{booking.type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(booking.priority)}`}>
                        {booking.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        {booking.status === "Upcoming" && (
                          <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-xs font-medium hover:shadow-lg transition-all transform hover:scale-105 flex items-center">
                            <Play className="w-3 h-3 mr-1" />
                            Join Session
                          </button>
                        )}
                        {booking.status === "Rescheduled" && (
                          <button className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full text-xs font-medium hover:shadow-lg transition-all transform hover:scale-105 flex items-center">
                            <RefreshCw className="w-3 h-3 mr-1" />
                            Reschedule
                          </button>
                        )}
                        {booking.status === "Completed" && (
                          <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full text-xs font-medium hover:shadow-lg transition-all transform hover:scale-105 flex items-center">
                            <Star className="w-3 h-3 mr-1" />
                            Review
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredBookings.length === 0 && (
            <div className="p-12 text-center">
              <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No sessions found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );

  const renderReportsSection = () => (
    <div className="space-y-6">
      {/* Weekly Stats - Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {reportData ? [
          { title: "Total Sessions", value: reportData.weeklyStats.totalSessions, icon: <Calendar className="w-6 h-6" />, color: "from-blue-500 to-blue-600", change: "+12% vs last week" },
          { title: "Active Patients", value: reportData.weeklyStats.totalPatients, icon: <Users className="w-6 h-6" />, color: "from-purple-500 to-purple-600", change: "Growing community" },
          { title: "New Patients", value: reportData.weeklyStats.newPatients, icon: <Users2 className="w-6 h-6" />, color: "from-indigo-500 to-indigo-600", change: "This week" },
          { title: "Cancelled", value: reportData.weeklyStats.cancelledSessions, icon: <AlertCircle className="w-6 h-6" />, color: "from-red-500 to-red-600", change: "Low cancellation" }
        ].map((stat, index) => (
          <div key={index} className="relative group">
            <div className="absolute inset-0 backdrop-blur-xl bg-gradient-to-br from-white/50 to-green-50/30 rounded-2xl"></div>
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-green-100 p-4 lg:p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className={`inline-flex p-3 bg-gradient-to-br ${stat.color} rounded-xl text-white`}>
                  {stat.icon}
                </div>
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <div className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent mb-1">
                {stat.value}
              </div>
              <div className="text-gray-600 font-medium mb-2 text-sm lg:text-base">{stat.title}</div>
              <div className="text-xs text-green-600">{stat.change}</div>
            </div>
          </div>
        )) : <div>Loading Reports...</div>}
      </div>

      {/* Top Concerns Chart */}
      <div className="relative">
        <div className="absolute inset-0 backdrop-blur-xl bg-gradient-to-r from-white/40 to-green-50/20 rounded-2xl"></div>
        <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-green-100 p-4 lg:p-6 shadow-lg">
          <h3 className="text-lg lg:text-xl font-semibold mb-4 text-gray-800 flex items-center">
            <PieChart className="w-5 h-5 mr-2 text-green-600" />
            Top Patient Concerns
          </h3>
          <div className="space-y-4">
            {reportData?.topConcerns.map((concern, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:items-center gap-2">
                <div className="w-full sm:w-24 text-sm font-medium text-gray-700">{concern.concern}</div>
                <div className="flex-1 mx-0 sm:mx-4">
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full bg-gradient-to-r ${
                        index === 0 ? "from-red-400 to-red-600" :
                        index === 1 ? "from-yellow-400 to-yellow-600" :
                        index === 2 ? "from-blue-400 to-blue-600" :
                        index === 3 ? "from-green-400 to-green-600" :
                        "from-purple-400 to-purple-600"
                      }`}
                      style={{ width: `${concern.percentage}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-sm text-gray-600 w-full sm:w-16 text-left sm:text-right">
                  {concern.count} ({concern.percentage}%)
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderPatientDetail = () => {
    return selectedPatient ? (
      <div className="space-y-6">
        {/* Back Button */}
        <button 
          onClick={() => setSelectedPatient(null)}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Patients</span>
        </button>

        {/* Patient Overview Cards - Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {[
            { title: "Total Sessions", value: selectedPatient.totalSessions, icon: <Calendar className="w-6 h-6" />, color: "from-blue-500 to-blue-600" },
            { title: "Current Session", value: `#${selectedPatient.sessionCount}`, icon: <Clock3 className="w-6 h-6" />, color: "from-green-500 to-green-600" },
            { title: "Progress Status", value: selectedPatient.progress, icon: <TrendingUp className="w-6 h-6" />, color: "from-purple-500 to-purple-600" },
            { title: "Priority Level", value: selectedPatient.priority, icon: <Target className="w-6 h-6" />, color: "from-orange-500 to-orange-600" }
          ].map((stat, index) => (
            <div key={index} className="relative group">
              <div className="absolute inset-0 backdrop-blur-xl bg-gradient-to-br from-white/50 to-purple-50/30 rounded-2xl"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-purple-100 p-4 lg:p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                <div className={`inline-flex p-3 bg-gradient-to-br ${stat.color} rounded-xl text-white mb-4`}>
                  {stat.icon}
                </div>
                <div className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium text-sm lg:text-base">{stat.title}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Treatment Plan & Session History - Responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Treatment Plan */}
          <div className="relative">
            <div className="absolute inset-0 backdrop-blur-xl bg-gradient-to-r from-white/40 to-purple-50/20 rounded-2xl"></div>
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-purple-100 p-4 lg:p-6 shadow-lg">
              <h3 className="text-lg lg:text-xl font-semibold mb-4 text-gray-800 flex items-center">
                <Target className="w-5 h-5 mr-2 text-purple-600" />
                Treatment Plan
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-purple-25 rounded-lg border border-purple-100">
                  <h4 className="font-semibold text-purple-800 mb-2">Primary Concern</h4>
                  <p className="text-gray-700 text-sm lg:text-base">{selectedPatient.notes}</p>
                </div>
                
                <div className="p-4 bg-green-25 rounded-lg border border-green-100">
                  <h4 className="font-semibold text-green-800 mb-2">Recommended Actions</h4>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Continue weekly sessions</li>
                    <li>• Practice mindfulness exercises</li>
                    <li>• Monitor mood daily</li>
                    <li>• Complete homework assignments</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Session History */}
          <div className="relative">
            <div className="absolute inset-0 backdrop-blur-xl bg-gradient-to-r from-white/40 to-purple-50/20 rounded-2xl"></div>
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-purple-100 p-4 lg:p-6 shadow-lg">
              <h3 className="text-lg lg:text-xl font-semibold mb-4 text-gray-800 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-purple-600" />
                Recent Sessions
              </h3>
              <div className="space-y-3">
                {[
                  { date: "Today", type: "Video Call", duration: "45 min", status: "Completed", notes: "Good progress on anxiety management" },
                  { date: "1 week ago", type: "Chat", duration: "30 min", status: "Completed", notes: "Discussed coping strategies" },
                  { date: "2 weeks ago", type: "Video Call", duration: "45 min", status: "Completed", notes: "Initial assessment and goal setting" },
                  { date: "3 weeks ago", type: "Video Call", duration: "60 min", status: "Completed", notes: "Comprehensive evaluation" }
                ].map((session, index) => (
                  <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-white/60 rounded-lg border border-purple-100 gap-2">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${session.type === "Video Call" ? "bg-blue-100" : "bg-green-100"
                        }`}>
                        {session.type === "Video Call" ? (
                          <Video className="w-4 h-4 text-blue-600" />
                        ) : (
                          <MessageCircle className="w-4 h-4 text-green-600" />
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{session.date}</div>
                        <div className="text-xs text-gray-500">{session.duration} • {session.type}</div>
                      </div>
                    </div>
                    <div className="text-left sm:text-right">
                      <div className="text-xs text-green-600 font-medium">{session.status}</div>
                      <div className="text-xs text-gray-500 max-w-full sm:max-w-32 truncate" title={session.notes}>
                        {session.notes}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

    
      </div>
    ) : null
  }

  const renderPatientsSection = () => (
    <div className="space-y-6">
      {/* Patients Header */}
      <div className="relative">
        <div className="absolute inset-0 backdrop-blur-xl bg-gradient-to-r from-white/40 to-purple-50/30 rounded-2xl"></div>
        <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-purple-100 p-4 lg:p-6 shadow-lg">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">Patient Reports</h2>
              <p className="text-gray-600">Individual patient progress and insights</p>
            </div>
            <div className="relative w-full lg:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search patients..."
                className="w-full lg:w-auto pl-10 pr-4 py-2 border border-purple-200 rounded-full bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Patient List - Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {bookings.map((patient, index) => (
          <div key={index} className="relative group cursor-pointer" onClick={() => setSelectedPatient(patient)}>
            <div className="absolute inset-0 backdrop-blur-xl bg-gradient-to-br from-white/50 to-purple-50/30 rounded-2xl"></div>
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-purple-100 p-4 lg:p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full">
                  <User className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <div className="font-mono text-lg font-semibold text-gray-900">{patient.id}</div>
                  <div className="text-sm text-gray-500">Patient Profile</div>
                </div>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Sessions</span>
                  <span className="font-semibold text-gray-900">{patient.totalSessions}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Progress</span>
                  <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                    patient.progress === "Improving" ? "bg-green-100 text-green-800" :
                    patient.progress === "Stable" ? "bg-blue-100 text-blue-800" :
                    patient.progress === "Significant improvement" ? "bg-emerald-100 text-emerald-800" :
                    "bg-gray-100 text-gray-800"
                  }`}>
                    {patient.progress}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Last Session</span>
                  <span className="text-sm text-gray-700">{patient.lastSession}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className={`text-xs font-medium px-2 py-1 rounded-full border ${getPriorityColor(patient.priority)}`}>
                  {patient.priority} Priority
                </span>
                <button className="px-3 py-1 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full text-xs font-medium hover:shadow-lg transition-all transform hover:scale-105 flex items-center">
                  <Eye className="w-3 h-3 mr-1" />
                  View Report
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen p-4 lg:p-8 relative">
      {/* Background Pattern with Blue Patches */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full" style={{
            backgroundImage: `linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        {/* Blue Patches - Static */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-blue-400 rounded-full opacity-40 -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-gradient-to-br from-sky-100 to-sky-400 rounded-full opacity-30 -translate-x-1/2"></div>
        <div className="absolute bottom-0 right-3/4 w-72 h-72 bg-gradient-to-tr from-indigo-100 to-indigo-400 rounded-full opacity-35 translate-y-1/3"></div>
        <div className="absolute bottom-1/3 left-3/4 w-64 h-64 bg-gradient-to-bl from-cyan-100 to-cyan-400 rounded-full opacity-30"></div>
        <div className="absolute top-5/7 right-1/4 w-56 h-56 bg-gradient-to-tl from-blue-100 to-blue-400 rounded-full opacity-25"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <header className="flex items-center justify-between lg:justify-center mb-6 lg:mb-8">
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex items-center space-x-1">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Hello, </h1>
            <span className="text-2xl lg:text-3xl font-bold text-blue-700">Dr. Sharthak</span>
          </div>

          {/* Spacer for mobile to center title */}
          <div className="w-10 lg:hidden"></div>
        </header>

        {/* Main Content */}
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Mobile Sidebar Overlay */}
          {sidebarOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}></div>
          )}

          {/* Sidebar Navigation */}
          <aside className={`
            fixed top-0 left-0 h-full w-64 z-50 transform transition-transform lg:relative lg:transform-none lg:w-auto lg:col-span-2
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}>
            <nav className="relative h-full p-4 lg:p-0">
              {/* Mobile Close Button */}
              <button
                className="lg:hidden absolute top-4 right-4 p-2 text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute inset-0 backdrop-blur-xl bg-gradient-to-b from-white/60 to-blue-50/40 rounded-2xl lg:rounded-2xl"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-blue-100 p-4 shadow-lg h-full lg:h-auto">
                
                {/* Mobile: Horizontal scrolling nav */}
                <div className="lg:hidden pt-8">
                  <div className="space-y-2">
                    {[
                      { label: "Dashboard", icon: <BarChart3 className="w-4 h-4" />, section: "dashboard" },
                      { label: "Patients", icon: <Users className="w-4 h-4" />, section: "patients" },
                      { label: "Reports", icon: <PieChart className="w-4 h-4" />, section: "reports" },
                    ].map((item) => (
                      <button
                        key={item.section}
                        onClick={() => {
                          setActiveSection(item.section);
                          setSidebarOpen(false);
                        }}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                          activeSection === item.section
                            ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md"
                            : "text-gray-600 hover:bg-blue-100 hover:text-blue-700"
                        }`}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                  <div className="mt-8 pt-4 border-t border-blue-100">
                    <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-100 transition-all">
                      <Zap className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>

                {/* Desktop: Vertical nav */}
                <div className="hidden lg:block">
                  <ul className="space-y-2">
                    {[
                      { label: "Dashboard", icon: <BarChart3 className="w-4 h-4" />, section: "dashboard" },
                      { label: "Patients", icon: <Users className="w-4 h-4" />, section: "patients" },
                      { label: "Reports", icon: <PieChart className="w-4 h-4" />, section: "reports" },
                    ].map((item) => (
                      <li key={item.section}>
                        <button
                          onClick={() => setActiveSection(item.section)}
                          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                            activeSection === item.section
                              ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md"
                              : "text-gray-600 hover:bg-blue-100 hover:text-blue-700"
                          }`}
                        >
                          {item.icon}
                          <span>{item.label}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 pt-4 border-t border-blue-100">
                    <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-100 transition-all">
                      <Zap className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </div>
            </nav>
          </aside>

          {/* Main Content Area */}
          <div className="lg:col-span-10">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CounsellorDashboard;