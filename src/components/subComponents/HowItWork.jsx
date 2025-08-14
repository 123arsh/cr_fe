import React from 'react';
import { FaCar, FaRegCalendarCheck, FaKey } from 'react-icons/fa';

const steps = [
  {
    img: '/images/quiz.png',
    title: 'Choose Your Car',
    desc: 'Browse our premium collection and pick the car that fits your style.',
    icon: <FaCar className="text-blue-500 text-2xl mr-2" />,
  },
  {
    img: '/images/appointment.png',
    title: 'Book Your Car',
    desc: 'Reserve your car online in just a few easy steps.',
    icon: <FaRegCalendarCheck className="text-purple-500 text-2xl mr-2" />,
  },
  {
    img: '/images/hands.png',
    title: 'Drive Away',
    desc: 'Pick up your keys and enjoy the ride!',
    icon: <FaKey className="text-blue-400 text-2xl mr-2" />,
  }
];

const HowItWork = () => {
  return (
    <div className="w-full py-12 px-4 sm:px-10 bg-gradient-to-b from-blue-50 via-blue-100 to-purple-50">
      <div className="mb-20 text-center">
        <h1 className="text-5xl sm:text-7xl font-serif font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent animate-gradient">
          How it Works
        </h1>
        <p className="text-gray-700 text-xl sm:text-2xl max-w-2xl mx-auto animate-fade-in-delay">
          Experience a seamless journey from selection to driving. Our process is simple, transparent, and tailored for you.
        </p>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-8 w-full max-w-6xl mx-auto relative">
        {/* Connecting line for steps */}
        <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 z-0">
          <div className="h-full w-full bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 opacity-30 rounded-full"></div>
        </div>
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="relative z-10 flex flex-col items-center text-center rounded-3xl p-7 bg-gradient-to-br from-white via-blue-50 to-purple-100/80 backdrop-blur-md shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl group animate-fade-in flex-1 min-h-[300px] min-w-[360px] max-w-md"
          >
            <div className="flex justify-center items-center rounded-full h-20 w-20 bg-gradient-to-br from-blue-200 via-purple-200 to-blue-100 mb-6 shadow-md group-hover:scale-110 transition-transform duration-300">
              <img src={step.img} alt={step.title} className="h-10 w-10" />
            </div>
            <div className="flex items-center justify-center mb-2">
              {step.icon}
              <h2 className="text-2xl font-serif font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-gradient">
                {step.title}
              </h2>
            </div>
            <p className="text-gray-700 text-base sm:text-lg font-medium leading-relaxed mt-2">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWork;
