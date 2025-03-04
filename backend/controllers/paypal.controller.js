import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const PAYPAL_BASE_URL = process.env.PAYPAL_BASE_URL;
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_SECRET = process.env.PAYPAL_SECRET;

// ✅ API to return PayPal Client ID to frontend
export const getClientID = (req, res) => {
  if (!PAYPAL_CLIENT_ID) {
    return res.status(500).json({ error: "PayPal Client ID is missing" });
  }
  res.json({ clientID: PAYPAL_CLIENT_ID });
};

// Generate PayPal Access Token
const generateAccessToken = async () => {
  try {
    const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`).toString("base64");
    const response = await axios.post(
      `${PAYPAL_BASE_URL}/v1/oauth2/token`,
      "grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error("Error generating PayPal access token:", error);
    throw new Error("Failed to generate access token");
  }
};

// Create PayPal Order (Without return_url)
export const createOrder = async (req, res) => {
  try {
    const { plan } = req.body; // Get plan from frontend
    let amount = "1.00"; // Default to $1

    if (plan === "Premium") amount = "2.00";
    else if (plan === "Free") amount = "0.00"; // Free plan (no payment)

    const accessToken = await generateAccessToken();
    const response = await axios.post(
      `${PAYPAL_BASE_URL}/v2/checkout/orders`,
      {
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: { currency_code: "USD", value: amount },
          },
        ],
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error creating PayPal order:", error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || error.message });
  }
};

// Capture PayPal Order
export const captureOrder = async (req, res) => {
  try {
    const accessToken = await generateAccessToken();
    const { orderID } = req.params;
    const response = await axios.post(
      `${PAYPAL_BASE_URL}/v2/checkout/orders/${orderID}/capture`,
      {},
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error capturing PayPal order:", error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || error.message });
  }
};
