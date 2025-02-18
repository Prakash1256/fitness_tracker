import React from "react";
import { FaDumbbell, FaUserFriends, FaExclamationCircle } from "react-icons/fa";

const ServicesSection = () => {
  return (
    <div className="flex flex-col pt-25 md:flex-row items-center bg-black text-white p-6 md:p-12">
      {/* Left Image Section */}
      <div className="md:w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1581460484520-bc7c3f533c9e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Replace with actual image path
          alt="Fitness Woman"
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Right Services Section */}
      <div className="md:w-1/2 bg-red-500 p-6 rounded-lg md:p-12 text-white">
        <h2 className="text-3xl font-bold mb-6">Services</h2>

        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <FaDumbbell className="text-3xl" />
            <div>
              <h3 className="font-bold">PERSONAL TRAINING</h3>
              <p>
                Etiam aliquam viverra hendrerit. Vestibulum ante ipsum primis in
                faucibus orci luctus et ultrices.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <FaUserFriends className="text-3xl " />
            <div>
              <h3 className="font-bold">PERSONAL Classes</h3>
              <p>
                Donec eu volutpat tellus, et sollicitudin arcu. Nam vulpu tate
                interdum magna id vehicula.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <FaExclamationCircle className="text-3xl" />
            <div>
              <h3 className="font-bold">PERSONAL TRAINING</h3>
              <p>
                Mauris sit amet hendrerit ipsum. Aenean id risus quis nibh
                blandit dignissim.
              </p>
            </div>
          </div>
        </div>

      
      </div>
    </div>
  );
};

export default ServicesSection;
