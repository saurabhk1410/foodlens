import React from "react";

export default function AboutUs() {
  const features = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-green-800"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M12 6.5L20 10.5V17l-8 4-8-4v-6.5L12 6.5z" />
        </svg>
      ),
      bg: "from-green-100 to-green-200",
      title: "Written by children aged 6–14",
      desc: "Authentic content created by young voices, sharing their ideas and creativity.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-green-800"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path d="M12 14v7m0-7L3 9m9 5l9-5" />
        </svg>
      ),
      bg: "from-green-100 to-green-200",
      title: "Backed by research, guided by educators",
      desc: "Expertly reviewed and supported by teachers to ensure quality learning.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-green-800"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M12 21s-6-4.35-9-9a6 6 0 0 1 9-7 6 6 0 0 1 9 7c-3 4.65-9 9-9 9z" />
        </svg>
      ),
      bg: "from-green-100 to-green-200",
      title:
        "A non-profit initiative — all proceeds go towards children’s education programs",
      desc: "Every purchase supports educational programs and empowers young learners.",
    },
  ];

  return (
    <div className="bg-green-100 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* Heading and Summary Row */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <h1 className="text-4xl md:text-5xl font-semibold text-gray-900">
            Why This{" "}
            <span className="text-green-800">
              Magazine
            </span>{" "}
            Matters!
          </h1>

          <p className="text-gray-700 text-lg font-semibold leading-relaxed md:text-center">
            This magazine is a celebration of how kids learn and create
          </p>
        </div>

        {/* Features + Video Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Features List */}
          <div className="space-y-8">
            {features.map((item, i) => (
              <div key={i} className="flex items-start space-x-4">
                <div
                  className={`w-16 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br ${item.bg}`}
                >
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Video Section */}
          <div className="relative">
            <video
              src="https://videos.pexels.com/video-files/5200349/5200349-uhd_3840_2160_25fps.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover rounded-3xl shadow-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
