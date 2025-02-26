import React from "react";

const About = () => {
  return (
    <>
      <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px]">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          }}
        ></div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 lg:p-16 text-white">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight">
            USING ROPES TO <span className="text-[#00AEEF]">INCREASE</span> <br /> YOUR CORE STRENGTH
          </h1>

          <p className="mt-3 text-sm md:text-lg text-gray-300 max-w-2xl">
          build muscle, lose weight, or improve your mental and body strength
          </p>

          {/* Category & Date */}
          <div className="flex items-center gap-4 mt-4 text-sm md:text-base">
            <span className="font-bold">FITNESS CLUB</span>
            <span>—</span>
            <span>FEB 10, 2025</span>
          </div>
        </div>
      </div>
      <div className="bg-[#222924] text-white py-25 px-4 md:px-12 lg:px-24 w-full">
      {/* About Our Gym Title */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold uppercase">About Our Gym</h2>
        <p className="text-white mt-2 max-w-2xl mx-auto">
        Welcome to <strong className="text-[#00AEEF]">Fitness Club</strong>, where fitness meets dedication! Our mission is to empower individuals of all fitness levels to achieve their health and wellness goals.
        </p>
      </div>

      {/* Stats & Images Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        {/* Card 1 */}
        <div>
          <img
            src="https://images.unsplash.com/photo-1554344728-77cf90d9ed26?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Gym Image"
            className="w-full rounded-lg shadow-lg"
          />
          <h3 className="text-2xl font-bold mt-4">
            50K<span className="text-blue-400">+</span>
          </h3>
          <p className="text-gray-400">Members</p>
        </div>

        {/* Card 2 */}
        <div>
          <img
            src="https://images.unsplash.com/photo-1434682772747-f16d3ea162c3?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Gym Image"
            className="w-full rounded-lg shadow-lg"
          />
          <h3 className="text-2xl font-bold mt-4">
            10<span className="text-blue-400">+</span>
          </h3>
          <p className="text-gray-400">Locations</p>
        </div>

        {/* Card 3 */}
        <div>
          <img
            src="https://images.unsplash.com/photo-1641337221253-fdc7237f6b61?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Gym Image"
            className="w-full rounded-lg shadow-lg"
          />
          <h3 className="text-2xl font-bold mt-4">
            84<span className="text-blue-400">+</span>
          </h3>
          <p className="text-gray-400">Trainers</p>
        </div>
      </div>

    

      {/* The Story Behind Our Gym Section */}
      <div className="pt-20 flex gap-15 flex-col md:flex-row items-center">
        <div className="md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1605296867724-fa87a8ef53fd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Training"
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        <div className="md:w-1/2  p-8 md:p-12  md:ml-[-50px] z-10 shadow-lg mt-6 md:mt-0">
          <h3 className="text-2xl md:text-3xl font-bold uppercase">
            The Story Behind Our Gym
          </h3>
          <p className="text-white mt-4">
          Growing obesity is one of the major health concerns in India, it seems to be accelerating rapidly. Once considered a problem of the West, obesity now has broadened its sphere,
          </p>
          <p className="text-white mt-4">
          It is fascinating to witness the technological advancements in every possible sector nowadays and so does in the fitness industry. The fitness industry has experienced a huge transformation over the
          </p>
          <p className="text-white mt-4">
          Nowadays, what we all have in common is stress, it can become a part of our lives. Feeling stressed in challenging situations such as job interviews, unrealistic workloads, school exams,
          </p>
         
        </div>
      </div>
    </div>
    </>
  );
};

export default About;
