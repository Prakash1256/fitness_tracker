import React, { useState } from "react";
import PaymentPage from "../pages/Paymentpage"; // Import PaymentPage component

const MembershipPage = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    { name: "Free", price: "0", features: ["Basic tracking", "Community access"] },
    { name: "Basic", price: "1.00", features: ["Advanced tracking", "Custom workouts", "Ad-free experience"] },
    { name: "Premium", price: "2.00", features: ["All Basic features", "Personalized coaching", "Priority support"] },
  ];

  const handleSubscribe = (plan) => {
    if (parseFloat(plan.price) === 0) {
      alert("You have selected the Free Plan!");
    } else {
      setSelectedPlan(plan); // Show the PaymentPage directly for paid plans
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#222924] py-25 px-4">
      {selectedPlan ? (
        <PaymentPage price={selectedPlan.price} />
      ) : (
        <>
          <h1 className="text-4xl font-bold text-gray-100 mb-6">Choose Your Plan</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
            {plans.map((plan, index) => (
              <div key={index} className="bg-[#222924] shadow-lg rounded-2xl p-6 text-center hover:scale-105 transition-all">
                <h2 className="text-2xl font-bold text-gray-100">{plan.name}</h2>
                <p className="text-xl text-gray-100 my-3">${plan.price}/month</p>
                <ul className="text-gray-100 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="py-1">✅ {feature}</li>
                  ))}
                </ul>
                <button
                  className="bg-blue-500  cursor-pointer text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all"
                  onClick={() => handleSubscribe(plan)}
                >
                  {parseFloat(plan.price) === 0 ? "Get Started" : "Subscribe"}
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MembershipPage;
