import React from 'react'

const Hero = () => {
  return (
   <div className="bg-[url('../../public/home.png')] rounded-4xl bg-center bg-cover h-screen pt-28 mx-8">
        <div className="h-full flex items-center justify-center bg-black/40 rounded-4xl">
          <div className="text-center px-4 max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Discover Food. <span className="text-gray-300">Not Just Restaurants.</span>
            </h1>
            <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
              AI-powered food discovery that helps you find the perfect dish for every occasion
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-black px-8 py-4 rounded-xl font-medium hover:bg-gray-100 transition-all shadow-lg">
                Get Started
              </button>
              <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-medium hover:bg-white/10 transition-all">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Hero