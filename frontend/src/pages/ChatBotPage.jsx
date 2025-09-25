import React, { useState, useEffect, useRef } from "react";
import { Bot, User, Send, MessageCircle, Calendar, Phone, AlertTriangle, Shield, Cross, X } from "lucide-react";
import {useNavigate} from "react-router-dom";
import { useChatStore } from "../stores/useChatStore";

/* --- Small local UI primitives so the page is standalone --- */
function Button({
  children,
  className = "",
  disabled,
  onClick,
  type = "button",
  ...rest
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

const Input = React.forwardRef(({ className = "", ...props }, ref) => {
  return <input ref={ref} {...props} className={`${className}`} />;
});
Input.displayName = "Input";

/* --- Chatbot Page (redesigned + enhanced with intent detection) --- */
export default function ChatbotPage() {
  const {quitSession} = useChatStore();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello 👋 I'm your MindCare Assistant. How are you feeling today?",
      timestamp: new Date(),
      intent: "safe"
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentIntent, setCurrentIntent] = useState("safe"); // safe, moderate, crisis
  const [crisisModalOpen, setCrisisModalOpen] = useState(true);

  const typingTimer = useRef(null);
  const messagesRef = useRef(null);
  const inputRef = useRef(null);

  const [footerHeight, setFooterHeight] = useState(56);
  const [headerHeight, setHeaderHeight] = useState(120);

  // Intent detection keywords (simplified for demo)

  const detectIntent = (text) => {
    const lowerText = text.toLowerCase();
    
    // Crisis keywords
    const crisisKeywords = ['suicide', 'kill myself', 'end it all', 'can\'t go on', 'want to die', 'harm myself', 'emergency', 'crisis'];
    
    // Moderate keywords
    const moderateKeywords = ['anxious', 'depressed', 'stressed', 'overwhelmed', 'panic', 'worried', 'sad', 'lonely', 'struggling'];
    
    if (crisisKeywords.some(keyword => lowerText.includes(keyword))) {
      return 'crisis';
    } else if (moderateKeywords.some(keyword => lowerText.includes(keyword))) {
      return 'moderate';
    }
    return 'safe';
  };

  // Get theme colors based on intent
  const getThemeColors = () => {
    switch (currentIntent) {
      case 'crisis':
        return {
          primary: 'bg-red-500',
          secondary: 'bg-red-100',
          border: 'border-red-400',
          text: 'text-red-600',
          gradient: 'from-red-500 to-red-600'
        };
      case 'moderate':
        return {
          primary: 'bg-orange-500',
          secondary: 'bg-orange-100',
          border: 'border-orange-400',
          text: 'text-orange-600',
          gradient: 'from-orange-500 to-orange-600'
        };
      default:
        return {
          primary: 'bg-blue-500',
          secondary: 'bg-blue-100',
          border: 'border-blue-400',
          text: 'text-blue-600',
          gradient: 'from-blue-500 to-blue-600'
        };
    }
  };

  const themeColors = getThemeColors();

  // measure header/footer to avoid overlap
  useEffect(() => {
    const measure = () => {
      const footerEl = document.querySelector("footer");
      const headerEl = document.querySelector("header");
      setFooterHeight(footerEl?.offsetHeight ?? 56);
      setHeaderHeight(headerEl?.offsetHeight ?? 120);
    };
    measure();
    const t = setTimeout(measure, 300);
    window.addEventListener("resize", measure);
    const observer = new MutationObserver(measure);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", measure);
      observer.disconnect();
    };
  }, []);

  // keep messages container scrolled to bottom
  useEffect(() => {
    const el = messagesRef.current;
    if (!el) return;
    setTimeout(() => {
      try {
        el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
      } catch (e) {
        el.scrollTop = el.scrollHeight;
      }
    }, 50);
  }, [messages, isTyping]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleBookAppointment = () => {
      navigate("/booking");
  };

  const handleEmergencyChat = () => {
    alert("Connecting you to emergency support...");
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const detectedIntent = detectIntent(input);
    // Only allow escalation, never downgrade intent
    setCurrentIntent((prevIntent) => {
      if (prevIntent === 'crisis') return 'crisis';
      if (prevIntent === 'moderate') {
        if (detectedIntent === 'crisis') {
          setCrisisModalOpen(true);
          return 'crisis';
        }
        return 'moderate';
      }
      // prevIntent is 'safe'
      if (detectedIntent === 'crisis') setCrisisModalOpen(true);
      return detectedIntent;
    });

    const newMessage = {
      sender: "user",
      text: input,
      timestamp: new Date(),
      intent: detectedIntent
    };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setTimeout(() => inputRef.current?.focus(), 0);

    setIsTyping(true);
    if (typingTimer.current) clearTimeout(typingTimer.current);
    typingTimer.current = setTimeout(() => {
      setIsTyping(false);

      let responses;
      // Use the highest intent for bot response
      let effectiveIntent = currentIntent;
      if (currentIntent === 'safe') {
        effectiveIntent = detectedIntent;
      } else if (currentIntent === 'moderate' && detectedIntent === 'crisis') {
        effectiveIntent = 'crisis';
      }
      switch (effectiveIntent) {
        case 'crisis':
          responses = [
            "I'm very concerned about what you're going through. Your safety is my priority. Please consider reaching out to a crisis counselor immediately.",
            "I hear that you're in a lot of pain right now. You don't have to go through this alone. Emergency support is available.",
            "Thank you for trusting me with your feelings. This sounds like a crisis situation. Please reach out to professional help right away."
          ];
          break;
        case 'moderate':
          responses = [
            "I can see you're going through a challenging time. These feelings are valid, and support is available. Would you like to schedule a session with a counselor?",
            "It sounds like you're dealing with some difficult emotions. Remember, seeking help is a sign of strength. Professional support can make a real difference.",
            "I understand you're struggling right now. You're not alone in this. Consider speaking with a mental health professional who can provide personalized support."
          ];
          break;
        default:
          responses = [
            "I understand. Remember to take a deep breath 🌿. Would you like a relaxation audio?",
            "That sounds like you're managing well. What's been helping you stay positive lately?",
            "Thank you for sharing that with me. Your feelings are valid. How can I support you today?",
            "I hear you. It's great that you're taking care of your mental health. What's one thing that made you smile today?",
            "Your mental health matters. I'm here to support you. How are you feeling right now?"
          ];
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: responses[Math.floor(Math.random() * responses.length)],
          timestamp: new Date(),
          intent: effectiveIntent
        },
      ]);
      setTimeout(() => inputRef.current?.focus(), 0);
    }, 1200);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const renderIntentIndicator = () => {
    if (currentIntent === 'safe') return null;
    
    return (
      <div className={`mb-4 p-3 rounded-xl border-l-4 ${
        currentIntent === 'crisis' 
          ? 'bg-red-50 border-red-500' 
          : 'bg-orange-50 border-orange-500'
      }`}>
        <div className="flex items-center gap-2">
          {currentIntent === 'crisis' ? (
            <AlertTriangle className="w-5 h-5 text-red-600" />
          ) : (
            <Shield className="w-5 h-5 text-orange-600" />
          )}
          <span className={`font-medium ${
            currentIntent === 'crisis' ? 'text-red-800' : 'text-orange-800'
          }`}>
            {currentIntent === 'crisis' ? 'Crisis Detected' : 'Moderate Concern Detected'}
          </span>
        </div>
        <p className={`text-sm mt-1 ${
          currentIntent === 'crisis' ? 'text-red-700' : 'text-orange-700'
        }`}>
          {currentIntent === 'crisis' 
            ? 'Immediate support may be needed. Professional help is recommended.'
            : 'You may benefit from professional support. Consider booking an appointment.'
          }
        </p>
      </div>
    );
  };

  const renderActionButton = () => {
    if (currentIntent === 'safe') return null;

    if (currentIntent === 'crisis' && crisisModalOpen) {
      return (
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-md mx-4 text-center relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl font-bold"
              aria-label="Close"
              onClick={() => setCrisisModalOpen(false)}
            >
              &times;
            </button>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Emergency Support Available</h3>
            <p className="text-gray-600 mb-6">We're here to help. Connect with emergency support right now.</p>
            <div className="flex gap-3">
              <Button
                onClick={handleEmergencyChat}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-xl font-medium transition-colors"
              >
                <Phone className="w-4 h-4 mr-2" />
                Emergency Chat
              </Button>
            </div>
          </div>
        </div>
      );
    }
    
    if (currentIntent === 'moderate' ) {
      return (
        <div className="mb-4">
          <Button
            onClick={handleBookAppointment}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 px-4 rounded-xl font-medium transition-all transform hover:scale-[1.02] shadow-lg"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Book Immediate Appointment
          </Button>
        </div>
      );
    }
  };

  return (
    <div
      className="min-h-screen relative overflow-x-hidden"
      style={{ backgroundColor: "#ffffff" }}
    >
      {/* Background Pattern with Dynamic Colors */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full" style={{
            backgroundImage: `linear-gradient(${currentIntent === 'crisis' ? '#ef4444' : currentIntent === 'moderate' ? '#f97316' : '#3b82f6'} 1px, transparent 1px), linear-gradient(90deg, ${currentIntent === 'crisis' ? '#ef4444' : currentIntent === 'moderate' ? '#f97316' : '#3b82f6'} 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Dynamic gradient blobs */}
        <div className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-br ${
          currentIntent === 'crisis' ? 'from-red-100 to-red-400' : 
          currentIntent === 'moderate' ? 'from-orange-100 to-orange-400' : 
          'from-blue-100 to-blue-400'
        } rounded-full opacity-40 -translate-y-1/2 translate-x-1/3 transition-colors duration-1000`}></div>
        
        <div className={`absolute top-1/4 left-1/4 w-80 h-80 bg-gradient-to-br ${
          currentIntent === 'crisis' ? 'from-red-100 to-red-400' : 
          currentIntent === 'moderate' ? 'from-orange-100 to-orange-400' : 
          'from-sky-100 to-sky-400'
        } rounded-full opacity-30 -translate-x-1/2 transition-colors duration-1000`}></div>
        
        <div className={`absolute bottom-0 right-3/4 w-72 h-72 bg-gradient-to-tr ${
          currentIntent === 'crisis' ? 'from-red-100 to-red-400' : 
          currentIntent === 'moderate' ? 'from-orange-100 to-orange-400' : 
          'from-indigo-100 to-indigo-400'
        } rounded-full opacity-35 translate-y-1/3 transition-colors duration-1000`}></div>
        
        <div className={`absolute bottom-1/3 left-3/4 w-64 h-64 bg-gradient-to-bl ${
          currentIntent === 'crisis' ? 'from-red-100 to-red-400' : 
          currentIntent === 'moderate' ? 'from-orange-100 to-orange-400' : 
          'from-cyan-100 to-cyan-400'
        } rounded-full opacity-30 transition-colors duration-1000`}></div>
      </div>

      <main className="relative z-10 px-4 md:px-6 max-w-6xl mx-auto pt-2">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gray-900">MindCare</span>
            <span className={`bg-gradient-to-r ${themeColors.gradient} bg-clip-text text-transparent transition-all duration-1000`}>
              {" "}
              Assistant
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A safe space for your thoughts and feelings. I'm here to listen,
            support, and guide you through your mental wellness journey.
          </p>
        </header>

        {/* Chat box */}
        <div className="flex justify-center w-full h-[75vh] relative">
          <div
            className={`w-full max-w-3xl sm:max-w-5xl bg-white backdrop-blur-sm border rounded-2xl shadow-xl flex flex-col ${themeColors.border} transition-colors duration-1000`}
            style={{ overflow: "hidden" }}
          >
            {/* Intent Indicator */}
            {renderIntentIndicator()}
            
            {/* Action Button for Moderate */}
            {currentIntent === 'moderate' && (
              <div className="p-4 pb-0">
                {renderActionButton()}
              </div>
            )}
            {currentIntent === 'crisis' && (
              <div className="p-4 pb-0">
                  <div className="mb-4">
                    <Button
                      onClick={() => setCrisisModalOpen(true)}
                      className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-xl font-medium transition-all transform hover:scale-[1.02] shadow-lg"
                    >
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Emergency Support
                    </Button>
                  </div>
              </div>
            )}


            {/* Messages */}
            <div
              ref={messagesRef}
              className="flex-1 overflow-y-auto p-6 space-y-4"
            >
              {messages.map((msg, idx) => (
                <article
                  key={idx}
                  className={`flex gap-3 items-start ${
                    msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-md ${
                      msg.sender === "user"
                        ? `bg-gradient-to-br ${themeColors.gradient}`
                        : `bg-white border-2 ${themeColors.border}`
                    } transition-colors duration-500`}
                  >
                    {msg.sender === "user" ? (
                      <User className="w-5 h-5 text-white" />
                    ) : (
                      <Bot className={`w-5 h-5 ${themeColors.text}`} />
                    )}
                  </div>
                  <div className="max-w-[60%] overflow-hidden">
                    <p className={`text-xs opacity-70 mb-1 ${
                      msg.sender === "user" ? "text-right text-gray-500" : "text-left text-gray-600"
                    }`}>
                      {msg.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    {msg.sender === "user" ? (
                      <div className={`bg-gradient-to-br ${themeColors.gradient} text-white p-3 rounded-2xl rounded-br-md shadow-md transition-colors duration-500`}>
                        <p className="text-sm md:text-base leading-relaxed break-words">
                          {msg.text}
                        </p>
                      </div>
                    ) : (
                      <div className={`bg-white/80 border ${themeColors.border} p-3 rounded-2xl rounded-bl-md shadow-md transition-colors duration-500`}>
                        <p className="text-sm md:text-base leading-relaxed text-gray-800 break-words">
                          {msg.text}
                        </p>
                      </div>
                    )}
                  </div>
                </article>
              ))}
              {isTyping && (
                <article className="flex gap-3 items-start animate-fadeIn">
                  <div className={`w-10 h-10 rounded-full bg-white border-2 ${themeColors.border} flex items-center justify-center shadow-md transition-colors duration-500`}>
                    <Bot className={`w-5 h-5 ${themeColors.text}`} />
                  </div>
                  <div className={`bg-white/80 border ${themeColors.border} p-4 rounded-2xl rounded-bl-md shadow-md min-w-[120px] max-w-[60%] transition-colors duration-500`}>
                    <div className="flex gap-1">
                      <div className={`w-2 h-2 ${themeColors.primary} rounded-full animate-pulse`} />
                      <div
                        className={`w-2 h-2 ${themeColors.primary} rounded-full animate-pulse`}
                        style={{ animationDelay: "0.15s" }}
                      />
                      <div
                        className={`w-2 h-2 ${themeColors.primary} rounded-full animate-pulse`}
                        style={{ animationDelay: "0.3s" }}
                      />
                    </div>
                  </div>
                </article>
              )}
            </div>

            {/* Input */}
            <div
              className={`border-t ${themeColors.border} p-4 transition-colors duration-500`}
            >
              <div
                className="relative bg-white/85 backdrop-blur-sm rounded-3xl p-3 shadow-sm 
                          flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
              >
                {/* Input */}
                <div className="flex-1 relative">
                  <Input
                    ref={inputRef}
                    type="text"
                    className="w-full h-12 pr-12 bg-white/95 border-none focus:ring-0 rounded-xl px-4"
                    placeholder="Share what's on your mind..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                  />
                  <MessageCircle className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>

                {/* Send Button */}
                <Button
                  onClick={sendMessage}
                  disabled={!input.trim()}
                  className="h-12 px-5 bg-gradient-to-r from-blue-500 to-blue-600 
                            text-white rounded-2xl shadow transition-all 
                            hover:scale-105 disabled:opacity-50 duration-500"
                >
                  <Send className="w-5 h-5" />
                </Button>

                {/* Quit Session Button */}
                <Button
                  onClick={() => {quitSession(); navigate('/student-dashboard');}}
                  className="group flex items-center justify-center gap-2 
                            h-10 sm:h-12 px-4 sm:px-6 
                            bg-gradient-to-r from-red-500 via-red-600 to-red-700
                            text-white font-medium rounded-2xl shadow-lg
                            transition-all duration-300 hover:scale-105 hover:shadow-xl
                            active:scale-95 disabled:opacity-50"
                >
                  <span className="text-sm sm:text-base tracking-wide">Quit Session</span>
                  <X className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:rotate-90" />
                </Button>
              </div>
            </div>
          </div>

          {/* Crisis Modal */}
          {currentIntent === 'crisis' && renderActionButton()}
        </div>
      </main>
    </div>
  );
}