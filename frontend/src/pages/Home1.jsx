import React, { useRef, useEffect } from "react";

const Home1 = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      video.currentTime = 0; // Start from the beginning
      video.play().catch((err) => console.error("Error playing video:", err));
    }
  }, []);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;

    const currentTime = video.currentTime;

    // Skip from 0:04 to 0:57
    if (currentTime >= 4 && currentTime < 57) {
      video.currentTime = 57;
    }

    // Pause at 1:04 and restart
    if (currentTime >= 60) {
      video.currentTime = 0; // Restart from beginning
      video.load(); // Reload video after resetting currentTime
      video.play().catch((err) => console.error("Error playing video:", err));
    }
  };

  return (
    <div className="text-center">
      {/* Video Section */}
      <div className="relative">
        <video
          ref={videoRef}
          className="w-full"
          autoPlay
          muted
          playsInline
          disablePictureInPicture
          onTimeUpdate={handleTimeUpdate} // Track time updates
        >
          <source src="/video/Gymwolf - Gym and Cardio workout tracker .mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Custom CSS to Hide UI */}
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


// import React from 'react'

// const Home1 = () => {
//   return (
//     <div>Home1</div>
//   )
// }

// export default Home1;