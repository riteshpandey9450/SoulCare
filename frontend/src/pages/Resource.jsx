import { useState } from "react";

export default function ResourcePage() {
  const [language, setLanguage] = useState("en");

  // Basic translations (can expand)
  const translations = {
    en: {
      title: "Resource Hub",
      subtitle: "Explore helpful resources for your mental well-being.",
      videos: "Videos",
      audios: "Relaxation Audios",
      guides: "Guides",
    },
    hi: {
      title: "संसाधन केंद्र",
      subtitle: "अपने मानसिक स्वास्थ्य के लिए सहायक संसाधनों का अन्वेषण करें।",
      videos: "वीडियो",
      audios: "आरामदायक ऑडियो",
      guides: "मार्गदर्शिकाएँ",
    },
    bn: {
      title: "রিসোর্স হাব",
      subtitle: "আপনার মানসিক সুস্থতার জন্য সহায়ক সম্পদগুলি অন্বেষণ করুন।",
      videos: "ভিডিও",
      audios: "রিলাক্সেশন অডিও",
      guides: "গাইডস",
    },
    ta: {
      title: "வள மையம்",
      subtitle: "உங்கள் மன நலத்திற்கான பயனுள்ள வளங்களை ஆராயுங்கள்.",
      videos: "வீடியோக்கள்",
      audios: "ஆறுதல் ஒலிகள்",
      guides: "வழிகாட்டிகள்",
    },
    te: {
      title: "వనరుల కేంద్రం",
      subtitle: "మీ మానసిక ఆరోగ్యానికి ఉపయోగకరమైన వనరులను అన్వేషించండి.",
      videos: "వీడియోలు",
      audios: "ఆరామ ఆడియోలు",
      guides: "మార్గదర్శకాలు",
    },
  };

  const resources = {
    videos: [
      { title: "Mindfulness Basics", link: "https://www.youtube.com/embed/ZToicYcHIOU" },
      { title: "Breathing Exercises", link: "https://www.youtube.com/embed/c1Ndym-IsmI" },
    ],
    audios: [
      { title: "5 Min Relaxation", link: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
      { title: "Calm Music", link: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
    ],
    guides: [
      { title: "Coping with Stress (PDF)", link: "#" },
      { title: "Better Sleep Tips (PDF)", link: "#" },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 md:px-20">
      {/* Header with language selector */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          {translations[language].title}
        </h1>
        <p className="text-gray-600 text-lg mb-4">{translations[language].subtitle}</p>

        {/* Language Selector */}
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
        >
          <option value="en">English</option>
          <option value="hi">हिंदी</option>
          <option value="bn">বাংলা</option>
          <option value="ta">தமிழ்</option>
          <option value="te">తెలుగు</option>
        </select>
      </div>

      <div className="max-w-5xl mx-auto space-y-12">
        {/* Videos */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-indigo-600">
            {translations[language].videos}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources.videos.map((vid, idx) => (
              <div key={idx} className="bg-white shadow-md rounded-xl p-4">
                <h3 className="font-medium mb-2">{vid.title}</h3>
                <iframe
                  src={vid.link}
                  title={vid.title}
                  className="w-full h-56 rounded-lg"
                  allowFullScreen
                ></iframe>
              </div>
            ))}
          </div>
        </section>

        {/* Audios */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-indigo-600">
            {translations[language].audios}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources.audios.map((audio, idx) => (
              <div key={idx} className="bg-white shadow-md rounded-xl p-4">
                <h3 className="font-medium mb-2">{audio.title}</h3>
                <audio controls className="w-full">
                  <source src={audio.link} type="audio/mp3" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            ))}
          </div>
        </section>

        {/* Guides */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-indigo-600">
            {translations[language].guides}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources.guides.map((guide, idx) => (
              <div key={idx} className="bg-white shadow-md rounded-xl p-4 flex items-center justify-between">
                <span className="font-medium">{guide.title}</span>
                <a
                  href={guide.link}
                  className="text-indigo-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download
                </a>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
