import React, { useRef, useEffect } from "react";
import {useNavigate} from "react-router-dom";

const Home1 = () => {
  const videoRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      video.currentTime = 0; // Start from the beginning
      video.play().catch((err) => console.error("Error playing video:", err));
    }
  }, []);

  const handleClick = () => {
    navigate('/about');
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;

    const currentTime = video.currentTime;

    // Skip from 4s to 9s
    if (currentTime >= 4 && currentTime < 9) {
      video.currentTime = 9;
    }

    // Restart video after it reaches the end
    if (currentTime >= 59) {
      video.currentTime = 0;
      video.play().catch((err) => console.error("Error playing video:", err));
    }
  };

  return (
    <div className="relative w-full h-[728px] max-w-none">
      {/* Video Section */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay
        muted
        playsInline
        disablePictureInPicture
        onTimeUpdate={handleTimeUpdate}
      >
        <source
          src="/video/Gymwolf - Gym and Cardio workout tracker .mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 space-y-6">
  <h1 className="text-gray-100 text-6xl md:text-6xl lg:text-8xl font-bold drop-shadow-lg">
    <span className="text-[#00AEEF]">Fitness</span> Club
  </h1>

  {/* Read More Button */}
  <button
    onClick={handleClick}
    className=" bg-gradient-to-r from-[#007BFF] to-[#0056B3] text-white px-8 py-2 text-sm rounded-lg cursor-pointer shadow-lg 
    hover:bg-red-500 hover:text-white transition"
  >
    Read More..
  </button>
</div>


      {/* Hide Video Controls */}
      <style>
        {`
          video::-webkit-media-controls {
            display: none !important;
          }
        `}
      </style>
    </div>
  );
};

export default Home1;
