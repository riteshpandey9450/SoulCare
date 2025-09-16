import React from "react";
import { Mail, Phone, Clock, Languages, Star, Heart, Badge } from "lucide-react";

export default function CounsellorProfile() {
  const counsellor = {
    id: "C-101",
    name: "Dr. Emily Carter",
    experience: "8 years",
    specialization: "Stress Management",
    email: "emily.carter@example.com",
    phone: "+91 98765 43210",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    qualification: "PhD in Clinical Psychology",
    availability: "Mon - Fri, 10:00 AM - 6:00 PM",
    languages: ["English", "Hindi"],
    bio:
      "Passionate about helping students overcome stress, anxiety, and personal challenges through empathetic counselling and evidence-based practices. With over 8 years of experience in clinical psychology, I specialize in cognitive behavioral therapy and mindfulness-based interventions.",
    rating: 4.9,
    totalSessions: 2847,
  };

  return (
    <main className="min-h-screen bg-white relative overflow-hidden p-6">
      {/* Subtle background grid + soft blue blobs to keep theme */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div
          className="absolute inset-0 opacity-6"
          style={{
            backgroundImage:
              "linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-blue-100 to-blue-400 rounded-full opacity-30 transform translate-x-12 -translate-y-12" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-cyan-100 to-sky-300 rounded-full opacity-25 transform -translate-x-8 translate-y-16" />
      </div>

      <section className="max-w-5xl mx-auto">
        <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl border border-blue-100 p-6 lg:p-10 shadow-xl">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">

            {/* Profile image + badge */}
            <div className="flex-shrink-0 flex flex-col items-center text-center lg:text-left">
              <div className="relative">
                <img
                  src={counsellor.image}
                  alt={counsellor.name}
                  className="w-36 h-36 rounded-full object-cover shadow-2xl ring-4 ring-white"
                />

                <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-green-400 to-green-500 rounded-full p-2 border-2 border-white shadow">
                  <span className="block w-3 h-3 bg-white rounded-full" />
                </div>
              </div>

              <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full border border-blue-100">
                <Badge className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-gray-700 font-medium">Verified Counsellor</span>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="text-lg font-semibold text-gray-800">{counsellor.rating}</span>
                <span className="text-sm text-gray-500">({counsellor.totalSessions} sessions)</span>
              </div>
            </div>

            {/* Main info */}
            <div className="flex-1 w-full">
              <h1 className="text-3xl lg:text-4xl font-bold mb-1 text-gray-900">{counsellor.name}</h1>
              <p className="text-lg text-blue-600 font-semibold mb-3">{counsellor.specialization}</p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                <div className="p-3 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-100 text-center">
                  <div className="text-sm text-gray-500">Experience</div>
                  <div className="text-lg font-semibold text-blue-600">{counsellor.experience}</div>
                </div>

                <div className="p-3 bg-gradient-to-br from-indigo-50 to-white rounded-xl border border-indigo-100 text-center">
                  <div className="text-sm text-gray-500">Languages</div>
                  <div className="text-lg font-semibold text-indigo-600">{counsellor.languages.join(", ")}</div>
                </div>

                <div className="p-3 bg-gradient-to-br from-cyan-50 to-white rounded-xl border border-cyan-100 text-center">
                  <div className="text-sm text-gray-500">Availability</div>
                  <div className="text-lg font-semibold text-cyan-600">{counsellor.availability}</div>
                </div>

                <div className="p-3 bg-gradient-to-br from-sky-50 to-white rounded-xl border border-sky-100 text-center">
                  <div className="text-sm text-gray-500">Counsellor ID</div>
                  <div className="text-lg font-semibold text-sky-600">{counsellor.id}</div>
                </div>
              </div>

              {/* Contact row + CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href={`mailto:${counsellor.email}`}
                  className="flex-1 p-3 flex items-center gap-3 bg-white/90 border border-blue-100 rounded-xl hover:shadow-md transition focus:outline-none"
                  aria-label="Email counsellor"
                >
                  <Mail className="w-5 h-5 text-blue-600" />
                  <div className="text-sm text-gray-700">{counsellor.email}</div>
                </a>

                <a
                  href={`tel:${counsellor.phone.replace(/\s+/g, "")}`}
                  className="flex-1 p-3 flex items-center gap-3 bg-white/90 border border-sky-100 rounded-xl hover:shadow-md transition focus:outline-none"
                  aria-label="Call counsellor"
                >
                  <Phone className="w-5 h-5 text-sky-600" />
                  <div className="text-sm text-gray-700">{counsellor.phone}</div>
                </a>

                
              </div>

            </div>
          </div>

          {/* About section (single, focused) */}
          <div className="mt-6 p-6 bg-white/70 rounded-2xl border border-blue-100 shadow-inner">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Heart className="w-6 h-6 text-red-500" />
              About Dr. Emily
            </h2>
            <p className="mt-3 text-gray-600 leading-relaxed text-lg">{counsellor.bio}</p>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="p-3 rounded-lg bg-blue-50 border border-blue-100">
                <div className="text-sm text-gray-500">Qualification</div>
                <div className="font-medium text-gray-700">{counsellor.qualification}</div>
              </div>

              {/* <div className="p-3 rounded-lg bg-indigo-50 border border-indigo-100">
                <div className="text-sm text-gray-500">Response Time</div>
                <div className="font-medium text-gray-700">&lt; 2 hours</div>
              </div> */}

              <div className="p-3 rounded-lg bg-cyan-50 border border-cyan-100">
                <div className="text-sm text-gray-500">Sessions</div>
                <div className="font-medium text-gray-700">{counsellor.totalSessions}</div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
