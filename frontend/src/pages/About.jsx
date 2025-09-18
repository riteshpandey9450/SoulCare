import React, { useState, useEffect } from 'react';
import { 
  Heart, Brain, Users, Shield, MessageCircle, Sparkles, ChevronRight, 
  Code, Palette, Database, Bot, Zap, Target, Star, Award, 
  Globe, TrendingUp, Coffee, Lightbulb, BookOpen, Activity 
} from 'lucide-react';

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('vision');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const team = [ 
  {
    name: "Vikhyat Singh",
    role: "Team Leader And MERN developer",
    bio: "Leads the team with strong leadership and expertise in scalable MERN architecture.",
    icon: <Users className="w-6 h-6" />,
    color: "from-blue-500 to-blue-600",
    // skills: ["Leadership", "MERN Stack", "Architecture"]
  },
  {
    name: "Avinash Singh",
    role: "Backend Developer",
    bio: "Designs secure APIs and manages scalable databases using Node.js and MongoDB.",
    icon: <Database className="w-6 h-6" />,
    color: "from-green-500 to-green-600",
    // skills: ["Node.js", "MongoDB", "API Design"]
  },
  {
    name: "Ritesh Pandey",
    role: "UI/UX Designer",
    bio: "Builds intuitive, inclusive, and accessible design systems for better user experiences.",
    icon: <Palette className="w-6 h-6" />,
    color: "from-purple-500 to-purple-600",
    // skills: ["UI/UX", "Accessibility", "Design Systems"]
  },
  {
    name: "Harshit Tiwari",
    role: "UI/UX Designer",
    bio: "Creates seamless interfaces with strong focus on usability and mental health awareness.",
    icon: <Lightbulb className="w-6 h-6" />,
    color: "from-pink-500 to-pink-600",
    // skills: ["User Research", "Prototyping", "Usability"]
  },
  {
    name: "Prateek Khare",
    role: "Full Stack Developer",
    bio: "Builds robust web applications with modern full-stack technologies like React and Node.js.",
    icon: <Code className="w-6 h-6" />,
    color: "from-indigo-500 to-indigo-600",
    // skills: ["React", "Node.js", "MongoDB"]
  },
  {
    name: "Riya Verma",
    role: "AI / ML Specialist",
    bio: "Develops AI-powered chatbots and NLP models to enable real-time conversational support.",
    icon: <Bot className="w-6 h-6" />,
    color: "from-cyan-500 to-cyan-600",
    // skills: ["AI/ML", "NLP", "Chatbots"]
  },
];

  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Empathy First",
      description: "Every decision we make is guided by genuine care for student wellbeing",
      color: "from-red-400 to-red-600"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Privacy & Security",
      description: "Your data is protected with enterprise-grade security and complete confidentiality",
      color: "from-blue-400 to-blue-600"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Inclusive Community",
      description: "Building bridges across diverse backgrounds to create supportive connections",
      color: "from-purple-400 to-purple-600"
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Innovation",
      description: "Leveraging cutting-edge technology to revolutionize mental health support",
      color: "from-yellow-400 to-yellow-600"
    }
  ];

  const stats = [
    { number: "6", label: "Team Members", icon: <Users className="w-6 h-6" /> },
    { number: "50K+", label: "Students Helped", icon: <Heart className="w-6 h-6" /> },
    { number: "24/7", label: "Support Available", icon: <Zap className="w-6 h-6" /> },
    { number: "98%", label: "User Satisfaction", icon: <Star className="w-6 h-6" /> }
  ];

  const milestones = [
    { year: "2024", title: "Platform Launch", description: "Launched comprehensive mental health platform" },
    { year: "2024", title: "AI Integration", description: "Implemented advanced AI chatbot for 24/7 support" },
    { year: "2024", title: "University Partnerships", description: "Partnered with 100+ educational institutions" },
    { year: "2024", title: "Recognition", description: "Awarded Best Mental Health Innovation" }
  ];

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
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

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-8">
        <div className="max-w-7xl mx-auto text-center">

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-gray-900">
            About Our
            <span className="bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent"> Mission</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            We are a passionate team of developers, designers, and mental health advocates dedicated to 
            revolutionizing student wellness through innovative technology and compassionate care.
          </p>

        </div>
      </section>

      {/* Vision & Mission Section with Tabs */}
{/* Vision, Mission & Values Section (Two-Part Layout) */}
<section className="relative z-10 px-6 py-5">
  <div className="max-w-6xl mx-auto">
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Our Purpose</h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Discover what drives us to create better mental health solutions for students worldwide
      </p>
    </div>

    {/* Main Card */}
    <div className="relative">
      <div className="absolute inset-0 backdrop-blur-2xl bg-gradient-to-br from-white/50 to-blue-50/30 rounded-3xl"></div>
      <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl border border-blue-100 p-8 lg:p-12 shadow-xl">
        
        {/* First Section: Vision + Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          
          {/* Vision Card */}
          <div className="relative group">
            <div className="absolute inset-0 backdrop-blur-xl bg-gradient-to-br from-white/50 to-blue-50/30 rounded-2xl"></div>
            <div className="relative bg-white/80 hover:scale-105 backdrop-blur-sm rounded-2xl border border-blue-100 p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full mb-6">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed">
                To create a world where mental health support is accessible, stigma-free, and integrated 
                into everyday student life. We envision an ecosystem where technology bridges the gap 
                between students and professionals, fostering growth, resilience, and balance in academic environments.
              </p>
            </div>
          </div>

          {/* Mission Card */}
          <div className="relative group">
            <div className="absolute inset-0 backdrop-blur-xl bg-gradient-to-br from-white/50 to-green-50/30 rounded-2xl"></div>
            <div className="relative bg-white/80 inset-0 group-hover:scale-105 backdrop-blur-sm rounded-2xl border border-green-100 p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-full mb-6">
                <Zap className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                Our mission is to empower students with tools for self-awareness, provide instant AI-driven 
                coping strategies, and connect them with professional counselors for personalized support. 
                We aim to reduce academic stress, improve focus, and promote overall well-being in educational institutions.
              </p>
            </div>
          </div>

        </div>

     

      </div>
    </div>
  </div>
</section>


      {/* Team Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Meet Our Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The passionate individuals working together to revolutionize student mental health support
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, idx) => (
              <div key={idx} className="relative group">
                <div className="absolute inset-0 backdrop-blur-2xl bg-gradient-to-br from-white/50 to-blue-50/30 rounded-2xl transform scale-95 group-hover:scale-100 transition-transform"></div>
                <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-blue-100 p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 text-center">
                  {/* Avatar with Icon */}
                  <div className={`w-20 h-20 lg:w-24 lg:h-24 mx-auto mb-6 rounded-full bg-gradient-to-r ${member.color} flex items-center justify-center shadow-lg`}>
                    <div className="text-white">{member.icon}</div>
                  </div>
                  
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-semibold mb-4">{member.role}</p>
                  <p className="text-gray-600 text-sm lg:text-base leading-relaxed mb-6">{member.bio}</p>
                  
                 
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

     
  
    </div>
  );
}