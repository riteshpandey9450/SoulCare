import React, { useState, useEffect, useRef } from "react";
import { Bot, User, Send, MessageCircle } from "lucide-react";

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

/* --- Chatbot Page (redesigned + enhanced scrollbar) --- */
export default function ChatbotPage() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello 👋 I'm your MindCare Assistant. How are you feeling today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const typingTimer = useRef(null);
  const messagesRef = useRef(null);
  const inputRef = useRef(null);

  const [footerHeight, setFooterHeight] = useState(56);
  const [headerHeight, setHeaderHeight] = useState(120);

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

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMessage = {
      sender: "user",
      text: input,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setTimeout(() => inputRef.current?.focus(), 0);

    setIsTyping(true);
    if (typingTimer.current) clearTimeout(typingTimer.current);
    typingTimer.current = setTimeout(() => {
      setIsTyping(false);
      const responses = [
        "I understand. Remember to take a deep breath 🌿. Would you like a relaxation audio?",
        "That sounds challenging. You're not alone in this. What's been helping you cope lately?",
        "Thank you for sharing that with me. Your feelings are valid. Would you like some mindfulness exercises?",
        "I hear you. Sometimes it helps to focus on small, positive steps. What's one thing that made you smile today?",
        "Your mental health matters. Consider speaking with a professional if you need additional support. How can I help you today?",
      ];
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: responses[Math.floor(Math.random() * responses.length)],
          timestamp: new Date(),
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


  return (
    <div
      className="min-h-screen relative overflow-x-hidden"
      style={{ backgroundColor: "#ffffff" }}
    >
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

      <main className="relative z-10 px-4 md:px-6 max-w-6xl mx-auto pt-2">
  {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gray-900">MindCare</span>
            <span className="bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
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
        <div className="flex justify-center w-full min-h-[75vh] border-blue-600">
          <div
            className="w-full max-w-3xl sm:max-w-5xl bg-white backdrop-blur-sm border rounded-2xl shadow-xl flex flex-col border-blue-400"
            style={{ overflow: "hidden" }}
          >
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
                        ? "bg-gradient-to-br from-blue-500 to-blue-600"
                        : "bg-white border-2 border-blue-200"
                    }`}
                  >
                    {msg.sender === "user" ? (
                      <User className="w-5 h-5 text-white" />
                    ) : (
                      <Bot className="w-5 h-5 text-blue-600" />
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
                      <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-3 rounded-2xl rounded-br-md shadow-md">
                        <p className="text-sm md:text-base leading-relaxed break-words">
                          {msg.text}
                        </p>
                      </div>
                    ) : (
                      <div className="bg-white/80 border border-blue-100 p-3 rounded-2xl rounded-bl-md shadow-md">
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
                  <div className="w-10 h-10 rounded-full bg-white border-2 border-blue-200 flex items-center justify-center shadow-md">
                    <Bot className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="bg-white/80 border border-blue-100 p-4 rounded-2xl rounded-bl-md shadow-md min-w-[120px] max-w-[60%]">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                      <div
                        className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"
                        style={{ animationDelay: "0.15s" }}
                      />
                      <div
                        className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"
                        style={{ animationDelay: "0.3s" }}
                      />
                    </div>
                  </div>
                </article>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-blue-100 p-4">
              <div className="relative bg-white/85 backdrop-blur-sm rounded-3xl p-3 shadow-sm flex items-center gap-3">
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
                <Button
                  onClick={sendMessage}
                  disabled={!input.trim()}
                  className="h-12 px-5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl shadow transition-transform hover:scale-[1.03] disabled:opacity-50"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}