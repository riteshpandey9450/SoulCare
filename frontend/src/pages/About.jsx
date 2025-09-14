export default function AboutPage() {
  const team = [
    {
      name: "Vikhyat Singh",
      role: "Team Leader & Full Stack Developer",
      bio: "Specializes in building scalable MERN applications, leading innovation in mental health tech.",
    },
    {
      name: "Ananya Sharma",
      role: "UI/UX Designer",
      bio: "Passionate about creating intuitive and inclusive user experiences tailored for accessibility.",
    },
    {
      name: "Rohit Verma",
      role: "Backend Engineer",
      bio: "Expert in API design, authentication systems, and database management with Node.js and MongoDB.",
    },
    {
      name: "Priya Iyer",
      role: "AI & Chatbot Specialist",
      bio: "Focused on AI-driven coping strategies and natural language models for real-time support.",
    },
    {
      name: "Priya Iyer",
      role: "AI & Chatbot Specialist",
      bio: "Focused on AI-driven coping strategies and natural language models for real-time support.",
    },
    {
      name: "Priya Iyer",
      role: "AI & Chatbot Specialist",
      bio: "Focused on AI-driven coping strategies and natural language models for real-time support.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 md:px-20">
      {/* About Section */}
      <section className="max-w-5xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">About Us</h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          We are a passionate team dedicated to improving mental health and
          wellness among students and young professionals. Our platform connects
          individuals with professional counselors, provides AI-driven coping
          strategies, and ensures a safe, private, and accessible space for
          self-care.
        </p>
      </section>

      {/* Vision & Mission Section */}
      <section className="max-w-6xl mx-auto mb-16 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
            🌟 Our Vision
          </h2>
          <p className="text-gray-700 leading-relaxed">
            To create a world where mental health support is accessible,
            stigma-free, and integrated into everyday student life. We envision
            an ecosystem where technology bridges the gap between students and
            professionals, fostering growth, resilience, and balance.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold text-green-600 mb-4">
            🎯 Our Mission
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Our mission is to empower students with tools for self-awareness,
            provide instant AI-driven coping strategies, and connect them with
            professional counselors for personalized support. We aim to reduce
            stress, improve focus, and promote overall well-being in academic
            institutions.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Meet Our Team
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition text-center"
            >
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-indigo-500 to-blue-400 flex items-center justify-center text-2xl font-bold text-white">
                {member.name.charAt(0)}
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                {member.name}
              </h3>
              <p className="text-sm text-indigo-600 mb-2">{member.role}</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
