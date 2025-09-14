import { useState } from "react";

export default function ChatbotPage() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello 👋 I'm your MindCare Assistant. How are you feeling today?" },
  ]);
  const [input, setInput] = useState("");

  // Handle sending a message
  const sendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    const newMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);

    // Simulated AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "I understand. Remember to take a deep breath 🌿. Would you like a relaxation audio?" },
      ]);
    }, 1000);

    setInput("");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">AI Chatbot</h1>

      {/* Chat Window */}
      <div className="w-full max-w-2xl bg-white shadow-md rounded-xl flex flex-col h-[70vh]">
        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg max-w-xs ${
                msg.sender === "user"
                  ? "ml-auto bg-indigo-600 text-white"
                  : "mr-auto bg-gray-200 text-gray-800"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Input Box */}
        <div className="p-3 border-t flex items-center gap-2">
          <input
            type="text"
            className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
