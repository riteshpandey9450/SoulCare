import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Square, Volume2, VolumeX, Reply, Clock, Users, Smile, Paperclip, Play, Pause, Download, X, FileText, Image as ImageIcon } from 'lucide-react';

const CommunityChatPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      content: "Welcome to our supportive community! 🌟 Share your thoughts and feelings freely here.",
      timestamp: new Date(Date.now() - 300000),
      isCurrentUser: false,
      anonymousId: "Anonymous-7x2K",
      type: "text",
      isAutoReply: false
    },
    {
      id: 2,
      content: "Thanks for creating this safe space. I've been feeling overwhelmed lately with studies 📚😅",
      timestamp: new Date(Date.now() - 240000),
      isCurrentUser: false,
      anonymousId: "Anonymous-9p3L",
      type: "text",
      isAutoReply: false
    }
  ]);
  
  const [newMessage, setNewMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [replyingTo, setReplyingTo] = useState(null);
  const [currentUserAnonymousId] = useState(`Anonymous-${Math.random().toString(36).substr(2, 4).toUpperCase()}`);
  const [autoReplyTimeout, setAutoReplyTimeout] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [playingAudio, setPlayingAudio] = useState(null);
  
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);
  const audioRef = useRef(null);

  // Emoji categories
  const emojiCategories = {
    "Smileys": ["😊", "😂", "🥰", "😍", "🤗", "😌", "😎", "🤔", "😅", "😭", "😢", "😴", "🥺", "😇", "🙂", "😄"],
    "Hearts": ["❤️", "💙", "💚", "💛", "🧡", "💜", "🤍", "🖤", "💕", "💖", "💗", "💘", "💝", "💞", "💟", "❣️"],
    "Gestures": ["👍", "👎", "👏", "🙏", "✌️", "🤞", "🤝", "👋", "🤟", "🤘", "👌", "🤙", "💪", "🙌", "👐", "🤲"],
    "Objects": ["📚", "🎵", "🌟", "⭐", "🌈", "🔥", "⚡", "💫", "✨", "💎", "🎯", "🎨", "📝", "💻", "📱", "🎧"]
  };

  const autoReplyResponses = [
    "That sounds really challenging. You're not alone in feeling this way. 💙",
    "Thank you for sharing. Your feelings are completely valid. 🤗",
    "I hear you. Sometimes it helps to take things one step at a time. 🌱",
    "Sending you positive thoughts. Remember to be kind to yourself. ✨",
    "Your courage in sharing this is inspiring. Take care of yourself. 🌟",
    "That resonates with me too. Community support means everything. 🤝",
    "I appreciate your honesty. You're stronger than you know. 💪",
    "Your perspective is valuable. Thanks for opening up. 🙏",
    "I understand how that feels. You're doing your best. ❤️",
    "That's a brave thing to share. Hope things get better for you. 🌈"
  ];

  useEffect(() => {
    // Keep messages container scrolled to bottom
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  const generateAutoReply = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    let responseIndex = 0;
    
    if (lowerMessage.includes('sad') || lowerMessage.includes('depressed') || lowerMessage.includes('down')) {
      responseIndex = 0;
    } else if (lowerMessage.includes('anxious') || lowerMessage.includes('worried') || lowerMessage.includes('stress')) {
      responseIndex = 2;
    } else if (lowerMessage.includes('thank') || lowerMessage.includes('grateful')) {
      responseIndex = 5;
    } else if (lowerMessage.includes('difficult') || lowerMessage.includes('hard') || lowerMessage.includes('struggle')) {
      responseIndex = 1;
    } else {
      responseIndex = Math.floor(Math.random() * autoReplyResponses.length);
    }
    
    return autoReplyResponses[responseIndex];
  };

  const handleSendMessage = () => {
    if (newMessage.trim() || audioBlob || uploadedFiles.length > 0) {
      const message = {
        id: Date.now(),
        content: newMessage || (audioBlob ? "Audio message" : "File attachment"),
        timestamp: new Date(),
        isCurrentUser: true,
        anonymousId: currentUserAnonymousId,
        type: audioBlob ? "audio" : uploadedFiles.length > 0 ? "file" : "text",
        replyTo: replyingTo,
        isAutoReply: false,
        audioBlob: audioBlob,
        files: uploadedFiles
      };

      setMessages(prev => [...prev, message]);
      
      // Clear auto-reply timeout if exists
      if (autoReplyTimeout) {
        clearTimeout(autoReplyTimeout);
      }
      
      // Set new auto-reply timeout for 1 minute (only for text messages)
      if (message.type === "text") {
        const timeout = setTimeout(() => {
          const autoReplyMessage = {
            id: Date.now() + 1,
            content: generateAutoReply(newMessage),
            timestamp: new Date(),
            isCurrentUser: false,
            anonymousId: `Anonymous-${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
            type: "text",
            isAutoReply: true
          };
          
          setMessages(prev => [...prev, autoReplyMessage]);
        }, 5000);
        
        setAutoReplyTimeout(timeout);
      }

      // Reset form
      setNewMessage("");
      setAudioBlob(null);
      setUploadedFiles([]);
      setReplyingTo(null);
      setShowEmojiPicker(false);
      
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        setAudioBlob(blob);
        stream.getTracks().forEach(track => track.stop());
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Unable to access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
      setMediaRecorder(null);
    }
  };

  const playAudio = (audioBlob, messageId) => {
    if (playingAudio === messageId) {
      audioRef.current.pause();
      setPlayingAudio(null);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      const url = URL.createObjectURL(audioBlob);
      audioRef.current = new Audio(url);
      audioRef.current.play();
      audioRef.current.onended = () => setPlayingAudio(null);
      setPlayingAudio(messageId);
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => file.size <= 10 * 1024 * 1024); // 10MB limit
    
    if (validFiles.length !== files.length) {
      alert('Some files were too large (max 10MB per file)');
    }
    
    setUploadedFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const removeAudio = () => {
    setAudioBlob(null);
    if (audioRef.current) {
      audioRef.current.pause();
      setPlayingAudio(null);
    }
  };

  const addEmoji = (emoji) => {
    setNewMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
   textareaRef.current.dispatchEvent(new Event('input', { bubbles: true }));
  };

  const handleReply = (message) => {
    setReplyingTo(message);
    textareaRef.current?.focus();
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const messageTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - messageTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return messageTime.toLocaleDateString();
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (file) => {
    if (file.type.startsWith('image/')) return <ImageIcon className="w-4 h-4" />;
    return <FileText className="w-4 h-4" />;
  };

  const MessageBubble = ({ message, isGrouped }) => {
    const { isCurrentUser, anonymousId, content, timestamp, type, replyTo, isAutoReply, audioBlob, files } = message;

    if (isCurrentUser) {
      return (
        <div className="flex justify-end animate-fade-in group mb-4">
          <div className="max-w-xs lg:max-w-md">
            {replyTo && (
              <div className="mb-2 p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border-l-4 border-blue-400">
                <p className="text-xs text-blue-700 font-medium">Replying to {replyTo.anonymousId}</p>
                <p className="text-xs text-blue-600 truncate">{replyTo.content}</p>
              </div>
            )}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl rounded-br-md px-4 py-3 shadow-lg hover:shadow-xl transition-all">
              {type === "audio" && audioBlob ? (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => playAudio(audioBlob, message.id)}
                    className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                  >
                    {playingAudio === message.id ? 
                      <Pause className="w-4 h-4" /> : 
                      <Play className="w-4 h-4" />
                    }
                  </button>
                  <span className="text-sm">Voice message</span>
                </div>
              ) : type === "file" && files ? (
                <div className="space-y-2">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center space-x-2 bg-white/20 rounded-lg p-2">
                      {getFileIcon(file)}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm truncate">{file.name}</p>
                        <p className="text-xs opacity-75">{formatFileSize(file.size)}</p>
                      </div>
                      <Download className="w-4 h-4 opacity-75" />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm md:text-base leading-relaxed break-words">{content}</p>
              )}
            </div>
            <div className="flex items-center justify-end gap-2 mt-1">
              <p className="text-xs text-gray-500">{formatTimestamp(timestamp)}</p>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => handleReply(message)}
                  className="p-1 hover:bg-gray-100 rounded-full"
                  title="Reply"
                >
                  <Reply className="w-3 h-3 text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className={`flex gap-3 animate-slide-in group mb-4 ${isGrouped ? 'mt-1' : ''}`}>
        {!isGrouped && (
          <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
            {anonymousId.split('-')[1]}
          </div>
        )}
        <div className={`flex-1 ${isGrouped ? 'ml-13' : ''}`}>
          {!isGrouped && (
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-semibold text-sm text-gray-800">{anonymousId}</span>
              <span className="text-xs text-gray-500">{formatTimestamp(timestamp)}</span>
            </div>
          )}
          {replyTo && (
            <div className="mb-2 p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border-l-4 border-gray-400 max-w-xs lg:max-w-md">
              <p className="text-xs text-gray-700 font-medium">Replying to {replyTo.anonymousId}</p>
              <p className="text-xs text-gray-600 truncate">{replyTo.content}</p>
            </div>
          )}
          <div className="bg-white/90 backdrop-blur-sm border border-purple-100 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm hover:shadow-md transition-all max-w-xs lg:max-w-md">
            <p className="text-sm md:text-base leading-relaxed text-gray-800 break-words">{content}</p>
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 mt-1">
            <button 
              onClick={() => handleReply(message)}
              className="p-1 hover:bg-gray-100 rounded-full"
              title="Reply"
            >
              <Reply className="w-3 h-3 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <audio ref={audioRef} />
      
      {/* Background Pattern - Same as HomePage */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full" style={{
            backgroundImage: `linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full opacity-40 -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-gradient-to-br from-sky-100 to-sky-200 rounded-full opacity-30 -translate-x-1/2"></div>
        <div className="absolute bottom-0 right-3/4 w-72 h-72 bg-gradient-to-tr from-indigo-100 to-indigo-200 rounded-full opacity-35 translate-y-1/3"></div>
        <div className="absolute bottom-1/3 left-3/4 w-64 h-64 bg-gradient-to-bl from-cyan-100 to-cyan-200 rounded-full opacity-30"></div>
      </div>

      <main className="relative z-10 px-4 md:px-6 max-w-6xl mx-auto pt-8 pb-6">
        {/* Chat Header */}
       <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gray-900">Community</span>
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {" "}
              Chat
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect anonymously with our supportive community. Share your thoughts, express yourself, and find support anytime.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-500">
            <Users className="w-4 h-4" />
            <span>You are: <span className="font-medium text-purple-600">{currentUserAnonymousId}</span></span>
          </div>
        </header>

        {/* Chat Container */}
        <div className="flex justify-center w-full">
          <div className="w-full max-w-4xl relative">
            <div className="absolute inset-0 backdrop-blur-2xl bg-gradient-to-br from-white/50 to-purple-50/30 rounded-2xl"></div>
            <div className="relative bg-white/80 backdrop-blur-sm border border-purple-200 rounded-2xl shadow-2xl flex flex-col"
                 style={{ height: "70vh" }}>
              
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-6" style={{ scrollBehavior: "smooth" }}>
                <div className="space-y-2">
                  {messages.map((message, index) => (
                    <MessageBubble
                      key={message.id}
                      message={message}
                      isGrouped={
                        index > 0 &&
                        messages[index - 1].anonymousId === message.anonymousId &&
                        !message.isCurrentUser &&
                        (new Date(message.timestamp) - new Date(messages[index - 1].timestamp)) < 60000
                      }
                    />
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Recording Indicator */}
              {isRecording && (
                <div className="px-6 py-3 bg-gradient-to-r from-red-50 to-pink-50 border-t border-red-100">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-red-700 font-medium">Recording audio message...</span>
                    <button 
                      onClick={stopRecording}
                      className="ml-auto px-3 py-1 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition-colors"
                    >
                      Stop
                    </button>
                  </div>
                </div>
              )}

              {/* Audio Preview */}
              {audioBlob && (
                <div className="px-6 py-3 bg-gradient-to-r from-green-50 to-emerald-50 border-t border-green-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => playAudio(audioBlob, 'preview')}
                        className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
                      >
                        {playingAudio === 'preview' ? 
                          <Pause className="w-4 h-4" /> : 
                          <Play className="w-4 h-4" />
                        }
                      </button>
                      <span className="text-sm text-green-700 font-medium">Audio message ready</span>
                    </div>
                    <button 
                      onClick={removeAudio}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* File Preview */}
              {uploadedFiles.length > 0 && (
                <div className="px-6 py-3 bg-gradient-to-r from-blue-50 to-cyan-50 border-t border-blue-100">
                  <div className="space-y-2">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-white/60 rounded-lg p-2">
                        <div className="flex items-center gap-2">
                          {getFileIcon(file)}
                          <div>
                            <p className="text-sm font-medium text-gray-700 truncate max-w-48">{file.name}</p>
                            <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFile(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reply Preview */}
              {replyingTo && (
                <div className="px-6 py-3 bg-gradient-to-r from-blue-50 to-sky-50 border-t border-blue-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Reply className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-blue-700">
                        Replying to <span className="font-medium">{replyingTo.anonymousId}</span>
                      </span>
                    </div>
                    <button 
                      onClick={() => setReplyingTo(null)}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm text-blue-600 mt-1 truncate">{replyingTo.content}</p>
                </div>
              )}

              {/* Message Input */}
              <div className="border-t border-purple-100 p-4">
                <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-3 shadow-sm">
                  {/* Text Input */}
                  <div className="flex items-end gap-3">
                    <div className="flex-1 relative">
                      <textarea
                        ref={textareaRef}
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Share your thoughts anonymously... 💭"
                        className="w-full px-4 py-3 bg-transparent border-none focus:ring-0 rounded-xl resize-none max-h-32 min-h-[48px] placeholder-gray-500"
                        rows="1"
                        onInput={(e) => {
                          e.target.style.height = 'auto';
                          e.target.style.height = Math.min(e.target.scrollHeight, 128) + 'px';
                        }}
                      />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      {/* Emoji Button */}
                      {/* <div className="relative">
                        <button
                          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                          className="p-3 hover:bg-purple-100 text-purple-600 rounded-xl transition-colors"
                          title="Add emoji"
                        >
                          <Smile className="w-5 h-5" />
                        </button>

                        {showEmojiPicker && (
                          <div className="absolute bottom-full mb-2 right-0 bg-white border border-purple-200 rounded-2xl shadow-xl p-4 w-80 z-50">
                            <div className="max-h-64 overflow-y-auto">
                              {Object.entries(emojiCategories).map(([category, emojis]) => (
                                <div key={category} className="mb-4">
                                  <h4 className="text-xs font-semibold text-gray-600 mb-2">{category}</h4>
                                  <div className="grid grid-cols-8 gap-1">
                                    {emojis.map((emoji) => (
                                      <button
                                        key={emoji}
                                        onClick={() => addEmoji(emoji)}
                                        className="p-2 hover:bg-purple-50 rounded-lg text-lg transition-colors"
                                      >
                                        {emoji}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div> */}

                      {/* File Upload */}
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="p-3 hover:bg-purple-100 text-purple-600 rounded-xl transition-colors"
                        title="Attach file"
                      >
                        <Paperclip className="w-5 h-5" />
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                        accept="image/*,.pdf,.doc,.docx,.txt"
                      />

                      {/* Audio Record */}
                      <button
                        onClick={isRecording ? stopRecording : startRecording}
                        className={`p-3 rounded-xl transition-all ${
                          isRecording 
                            ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse' 
                            : 'hover:bg-purple-100 text-purple-600'
                        }`}
                        title={isRecording ? "Stop recording" : "Record audio message"}
                      >
                        {isRecording ? <Square className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                      </button>

                      {/* Send Button */}
                      <button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim() && !audioBlob && uploadedFiles.length === 0}
                        className="h-12 px-5 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl shadow-lg transition-all hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none flex items-center justify-center"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </main>

      {/* Click outside to close emoji picker */}
      {showEmojiPicker && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowEmojiPicker(false)}
        ></div>
      )}

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-in {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        
        /* Custom Scrollbar */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: rgba(243, 244, 246, 0.5);
          border-radius: 3px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: rgba(147, 51, 234, 0.3);
          border-radius: 3px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: rgba(147, 51, 234, 0.5);
        }
        
        textarea::-webkit-scrollbar {
          width: 4px;
        }
        textarea::-webkit-scrollbar-track {
          background: transparent;
        }
        textarea::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 2px;
        }
        
        /* Smooth message animations */
        .animate-fade-in, .animate-slide-in {
          transform-origin: left bottom;
        }
        
        /* Enhanced emoji picker scrollbar */
        .emoji-picker::-webkit-scrollbar {
          width: 4px;
        }
        .emoji-picker::-webkit-scrollbar-track {
          background: rgba(243, 244, 246, 0.5);
          border-radius: 2px;
        }
        .emoji-picker::-webkit-scrollbar-thumb {
          background: rgba(147, 51, 234, 0.3);
          border-radius: 2px;
        }
        
        /* File input styling */
        input[type="range"] {
          background: linear-gradient(to right, #8b5cf6 0%, #8b5cf6 70%, #e5e7eb 70%, #e5e7eb 100%);
        }
        
        /* Focus states */
        textarea:focus {
          outline: none;
          box-shadow: 0 0 0 2px rgba(147, 51, 234, 0.1);
        }
        
        button:focus {
          outline: none;
          box-shadow: 0 0 0 2px rgba(147, 51, 234, 0.2);
        }
      `}</style>
    </div>
  );
};

export default CommunityChatPage;