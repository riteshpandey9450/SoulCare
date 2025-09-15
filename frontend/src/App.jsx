import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LandingPage from './pages/LandingPage'
import Auth from './pages/Auth'
import StudentDashboard from './pages/StudentDashboard'
import ChatbotPage from './pages/ChatBotPage'
import BookingPage from './pages/Booking'
import About from './pages/About'
import ContactPage from './pages/Contact'
import ResourcePage from './pages/Resource'
import ProfilePage from './pages/ProfilePage'
import CounsellorDashboard from './pages/CounsellorDashboard'
import AdminDashboard from './pages/AdminDashboard'
import CounsellorManagement from './pages/CounsellorManagementPage'
import FeedbackPage from './pages/FeedbackPage'
import Reports from './pages/Reports'

const App = () => {
  const role = "student"
  return (
    <>
      <Router>
        <Navbar/>
          <Routes>
            <Route path='/' element={<LandingPage/>} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path= {`student-dashboard`} element={<StudentDashboard />} />
            <Route path= {`counsellor-dashboard`} element={<CounsellorDashboard />} />
            <Route path= {`admin-dashboard`} element={<AdminDashboard />} />
            <Route path="/chatbot" element={<ChatbotPage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/resources" element={<ResourcePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/manage-counsellors" element={<CounsellorManagement />} />
            <Route path="/feedback-form" element={<FeedbackPage />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        <Footer/>
      </Router>
    </>
  )
}

export default App
