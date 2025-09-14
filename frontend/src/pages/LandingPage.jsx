import React, { useState, useEffect } from 'react';
import { Heart, Brain, Users, Shield, MessageCircle, Sparkles, ChevronRight, Menu, X, Phone, BookOpen, Activity, Headphones, Star, Zap, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Support",
      description: "Intelligent chatbots and personalized mental health assessments available 24/7",
      color: "from-blue-400 to-blue-600"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Peer Support Groups",
      description: "Connect with fellow students in moderated, safe online communities",
      color: "from-sky-400 to-sky-600"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Complete Privacy",
      description: "Your data is encrypted and confidential. Seek help without stigma",
      color: "from-indigo-400 to-indigo-600"
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Professional Counseling",
      description: "Access licensed therapists through video, voice, or text sessions",
      color: "from-blue-500 to-blue-700"
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Self-Help Resources",
      description: "Curated library of articles, exercises, and coping strategies",
      color: "from-cyan-400 to-cyan-600"
    },
    {
      icon: <Activity className="w-8 h-8" />,
      title: "Wellness Tracking",
      description: "Monitor your mood, sleep, and stress levels with intuitive tools",
      color: "from-sky-500 to-sky-700"
    }
  ];

  const stats = [
    { number: "50K+", label: "Students Supported", icon: <Users className="w-6 h-6" /> },
    { number: "98%", label: "Satisfaction Rate", icon: <Star className="w-6 h-6" /> },
    { number: "24/7", label: "Available Support", icon: <Zap className="w-6 h-6" /> },
    { number: "100+", label: "Partner Universities", icon: <Target className="w-6 h-6" /> }
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
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-50 backdrop-blur-xl rounded-full border border-blue-200 mb-8">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-gray-700 font-medium">Trusted by 100+ Universities Worldwide</span>
          </div>
          

          <div className="flex flex-col-reverse sm:flex-row justify-center items-center">
              <div className="flex flex-col items-center justify-center max-w-[50%]">
                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-gray-900">Development Of a</h1>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight  bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">Digital Mental health</h1>
                  <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Breaking barriers to mental health support with innovative technology. 
            Access professional help, peer support, and self-care resources anytime, anywhere.
          </p>

              </div>
              <div className='border-box'>
              <img src="doc.png" alt="" className='sm:max-h-[25rem]'/>
              </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-blue-200 transition-all transform hover:scale-105 flex items-center justify-center">
              Start Your Journey
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            {/* <button className="px-8 py-4 bg-white backdrop-blur-xl rounded-full text-lg font-semibold border-2 border-blue-200 text-gray-700 hover:bg-blue-50 transition-all flex items-center justify-center">
              <Phone className="w-5 h-5 mr-2 text-blue-600" />
              Crisis Helpline
            </button> */}
          </div>

          {/* Hero Cards with Localized Blur */}
          <div className="relative mx-auto max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: <Headphones className="w-12 h-12" />, title: "Listen & Understand", desc: "AI-powered emotional support", color: "from-blue-500 to-blue-600" },
                { icon: <Heart className="w-12 h-12" />, title: "Care & Support", desc: "24/7 access to mental health resources", color: "from-sky-500 to-sky-600" },
                { icon: <Shield className="w-12 h-12" />, title: "Safe & Confidential", desc: "Your privacy is our top priority", color: "from-indigo-500 to-indigo-600" }
              ].map((item, index) => (
                <div key={index} className="relative group">
                  {/* Localized blur effect behind card */}
                  <div className="absolute inset-0 backdrop-blur-2xl bg-gradient-to-br from-white/40 to-white/20 rounded-2xl transform group-hover:scale-105 transition-transform"></div>
                  <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-100 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2">
                    <div className={`bg-gradient-to-br ${item.color} p-3 rounded-xl inline-block mb-4`}>
                      <div className="text-white">{item.icon}</div>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-800">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with Blur Cards */}
      <section className="relative z-10 px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="relative group">
                {/* Localized blur behind stat card */}
                <div className="absolute inset-0 backdrop-blur-xl bg-gradient-to-br from-blue-50/50 to-white/30 rounded-2xl"></div>
                <div className="relative bg-white/70 backdrop-blur-sm rounded-2xl border border-blue-100 p-6 text-center transform hover:scale-105 transition-all shadow-lg hover:shadow-xl">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full mb-3">
                    <div className="text-blue-600">{stat.icon}</div>
                  </div>
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Comprehensive Support System
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need for your mental wellness journey in one secure platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="relative group">
                {/* Localized blur effect */}
                <div className="absolute inset-0 backdrop-blur-2xl bg-gradient-to-br from-white/50 to-blue-50/30 rounded-2xl transform scale-95 group-hover:scale-100 transition-transform"></div>
                <div className="relative bg-white/70 backdrop-blur-sm rounded-2xl border border-blue-100 p-8 hover:shadow-2xl transition-all transform hover:-translate-y-2">
                  <div className={`inline-flex p-3 bg-gradient-to-br ${feature.color} rounded-xl mb-4 text-white`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative">
            {/* Large blur area behind CTA */}
            <div className="absolute inset-0 backdrop-blur-3xl bg-gradient-to-r from-blue-100/40 to-sky-100/40 rounded-3xl"></div>
            <div className="relative bg-gradient-to-br from-blue-50/90 to-white/90 backdrop-blur-sm rounded-3xl border border-blue-200 p-12 shadow-2xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                Ready to Prioritize Your Mental Health?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Join thousands of students who've taken the first step towards better mental wellness
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/auth" className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-blue-200 transition-all transform hover:scale-105">
                  Get Started Free
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;