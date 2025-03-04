import React from "react";
import { FaDumbbell, FaBicycle, FaWeightHanging, FaRunning } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const classes = [
  { icon: <FaDumbbell size={40} />, title: "HEAVY WEIGHT CLASSES" },
  { icon: <FaBicycle size={40} />, title: "INDOOR CYCLING CLASSES" },
  { icon: <FaWeightHanging size={40} />, title: "BODY BUILDING CLASSES" },
  { icon: <FaRunning size={40} />, title: "WEIGHT LOSS CLASSES" },
];

const Classes = () => { 
     
  const navigate = useNavigate();

    const teamMembers = [
        {
          name: "Joe Bloggs",
          role: "Weight Lifting ",
          image: "https://images.unsplash.com/photo-1690731824019-83ad76c6b678?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Replace with actual image URL
        },
        {
          name: "Charlie Watson",
          role: "Body builder",
          image: "https://images.unsplash.com/photo-1734668488118-d94a330cb831?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          name: "Rachel Danielle",
          role: "Yoga student",
          image: "https://images.unsplash.com/photo-1620862657760-72a639a2daef?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
    
      ];

    const images = [
        "https://images.unsplash.com/photo-1554344728-77cf90d9ed26?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1546483875-ad9014c88eba?q=80&w=1982&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1517343985841-f8b2d66e010b?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
        
    ];
  return (
   <>
    <section className="bg-[#222924] text-white py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-2">OUR FEATURES CLASSES</h2>
        <p className="text-lg mb-8">CHECKOUT OUR FITNESS CLASSES</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {classes.map((item, index) => (
            <div
              key={index}
              className="bg-[#222924] cursor-pointer p-6 rounded-lg flex flex-col items-center shadow-lg"
            >
              <div className="text-[#00AEEF] p-4 rounded-full mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-300">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section>
         <div className="relative w-full bg-[#222924] flex flex-col gap-10 lg:flex-row items-center justify-between px-8 lg:px-20 py-18">
      {/* Left Section - Image */}
      <div className="w-full lg:w-1/2 flex justify-center">
        <img
          src="https://images.unsplash.com/photo-1571388072750-31a921b3d900?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Fitness Training"
          className="max-w-full h-auto"
        />
      </div>

      {/* Right Section - Content */}
      <div className="w-full lg:w-1/2 text-white text-center lg:text-left">
        <h2 className="text-3xl lg:text-5xl font-bold leading-tight">
          FITNESS CLASSES THIS SUMMER.
          <br /> PAY NOW AND GET <span className="text-[#00AEEF]">25% DISCOUNT</span>
        </h2>
        <p className="mt-4 text-gray-400 text-lg">
          Voluptatem quia voluptas sit aspernatur aut odit aut fugit sed quia
          conseur magni dolores eos.
        </p>

        {/* Button */}
        <button
      onClick={() => navigate("/membership")}
      className="mt-6 bg-[#00AEEF] cursor-pointer hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-md transition duration-300"
    >
      BECOME A MEMBER
    </button>
      </div>
    </div>

    {/* image scrolling  */} 

    <div className="relative w-full overflow-hidden bg-[#222924] py-15">
      <div className="flex w-max animate-scroll whitespace-nowrap">
        {[...images, ...images].map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`img-${index}`}
            className="w-[300px] h-[200px] object-cover mx-2 rounded-lg"
          />
        ))}
      </div>
    </div>
    </section>

    {/* happy client */}
    <div className="text-center py-12 px-4 bg-[#222924] py-30">
      <h2 className="text-4xl font-bold text-[#00AEEF]">Our Happy Customer</h2>
      <div className="flex flex-wrap justify-center gap-6 mt-10 px-4">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="flex items-center bg-[#222924] shadow-lg rounded-lg overflow-hidden max-w-sm w-full sm:w-96"
          >
            <img
              className="w-24 h-24 object-cover"
              src={member.image}
              alt={member.name}
            />
            <div className="p-4">
              <h3 className="text-xl font-bold text-gray-100">{member.name}</h3>
              <p className="text-gray-400 italic">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
   </>
  );
};

export default Classes;
