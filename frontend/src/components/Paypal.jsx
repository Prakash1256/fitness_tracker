import React, { useState, useEffect } from "react";
import axios from "axios";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const Paypal = ({ showPayPal }) => {
  const [orderID, setOrderID] = useState(null);
  const [clientID, setClientID] = useState("");

  // Fetch PayPal Client ID from Backend
  useEffect(() => {
    axios
      .get("https://fitness-tracker-8.onrender.com/api/paypal/client-id") // Ensure your backend exposes this
      .then((res) => setClientID(res.data.clientID))
      .catch((err) => console.error("Error fetching PayPal client ID:", err));
  }, []);

  // Create Order
  const createOrder = async () => {
    try {
      const response = await axios.post("https://fitness-tracker-8.onrender.com/api/paypal/create-order");
      setOrderID(response.data.id);
      return response.data.id;
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  // Capture Order
  const onApprove = async (data) => {
    try {
      const response = await axios.post(`https://fitness-tracker-8.onrender.com/api/paypal/capture-order/${data.orderID}`);
      alert("Payment Successful!");
      console.log(response.data);
    } catch (error) {
      console.error("Error capturing order:", error);
      alert("Payment failed!");
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      {showPayPal && clientID ? (
        <PayPalScriptProvider options={{ "client-id": clientID }}>
          <h2 className="text-lg font-semibold mb-4 text-center">Pay with PayPal</h2>
          <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
        </PayPalScriptProvider>
      ) : null}
    </div>
  );
};

export default Paypal;
