export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 py-16 bg-gray-50 flex-grow">
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-4xl font-extrabold text-gray-900">
            A Safe Digital Space for Student Mental Wellness
          </h2>
          <p className="text-lg text-gray-600">
            Connect with counsellors, access resources, and find your calm — all in one private platform.
          </p>
          <div className="space-x-4">
            <button className="bg-indigo-600 text-white px-5 py-3 rounded-lg hover:bg-indigo-700">
              Start Chat
            </button>
            <button className="bg-gray-200 text-gray-800 px-5 py-3 rounded-lg hover:bg-gray-300">
              Book Appointment
            </button>
          </div>
        </div>

        {/* Illustration / Right Side */}
        <div className="md:w-1/2 mt-10 md:mt-0">
          <img
            src="https://illustrations.popsy.co/white/student-mental-health.svg"
            alt="Mental Health"
            className="w-full max-w-md mx-auto"
          />
        </div>
      </section>

    </div>
  );
}
