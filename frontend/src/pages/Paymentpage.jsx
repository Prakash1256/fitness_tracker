import React, { useState, useEffect } from "react";
import axios from "axios";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useLocation } from "react-router-dom";

const PaymentPage = () => {
  const [clientID, setClientID] = useState("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const price = searchParams.get("price") || "1.00"; // Default to $1

  useEffect(() => {
    axios
      .get("https://fitness-tracker-8.onrender.com/api/paypal/client-id")
      .then((res) => setClientID(res.data.clientID))
      .catch((err) => console.error("Error fetching PayPal client ID:", err));
  }, []);

  const createOrder = async () => {
    try {
      const response = await axios.post("https://fitness-tracker-8.onrender.com/api/paypal/create-order", {
        amount: price,
      });
      return response.data.id;
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  const onApprove = async (data) => {
    try {
      await axios.post(`https://fitness-tracker-8.onrender.com/api/paypal/capture-order/${data.orderID}`);
      alert("Payment Successful!");
    } catch (error) {
      console.error("Error capturing order:", error);
      alert("Payment failed!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-10 bg-[#222924]">
      <h2 className="text-3xl font-semibold text-gray-100 mb-4">Complete Your Payment</h2>
      {clientID && (
        <PayPalScriptProvider options={{ "client-id": clientID }}>
          <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
        </PayPalScriptProvider>
      )}
    </div>
  );
};

export default PaymentPage;
