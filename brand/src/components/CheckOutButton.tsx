"use client";
import { useState } from "react";
import axios from "axios";
import { createOrderId } from "./createOrder";

export default function CheckoutButton() {
    const [loading, setLoading] = useState(false);
    const [price, setPrice] = useState(10);

    // Dynamically load Razorpay SDK
    const loadRazorpay = (): Promise<boolean> => {
        return new Promise((resolve) => {
            const existingScript = document.querySelector("#razorpay-sdk");
            if (existingScript) {
                resolve(true); // Already loaded
                return;
            }

            const script = document.createElement("script");
            script.id = "razorpay-sdk";
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async () => {
        setLoading(true);

        const razorpayLoaded = await loadRazorpay();
        if (!razorpayLoaded) {
            alert("Razorpay SDK failed to load. Check your internet connection.");
            setLoading(false);
            return;
        }

        try {
            // Call backend to create order
            const orderResponse = await createOrderId(price);
            console.log("Order Response:", orderResponse);

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: price * 100,
                currency: "INR",
                name: "Gupta Company",
                order_id: orderResponse.id,
                handler: async function (response: any) {
                    try {
                        const paymentResponse = await axios.post(
                            `${import.meta.env.VITE_API_URL}/payment/verify-order`,
                            {
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                            }
                        );

                        alert("Payment Successful!");
                        console.log("Verification Response:", paymentResponse.data);
                    } catch (err) {
                        alert("Payment verification failed. Please contact support.");
                        console.error(err);
                    }
                },
                prefill: {
                    name: "YOUR_NAME",
                    email: "acashgupta960@gmail.com",
                },
                theme: {
                    color: "#3399cc",
                },
            };

            const razorpay = new (window as any).Razorpay(options);

            razorpay.on("payment.failed", function (response: any) {
                alert("Payment failed");
                console.error("Payment Error:", response.error);
            });

            razorpay.open();
        } catch (err) {
            console.error("Payment initiation failed", err);
        }

        setLoading(false);
    };

    return (
        <div className="flex flex-col items-center mt-10">
            <h2 className="text-xl font-semibold mb-4">Total Amount: ₹{price}</h2>
            <button
                className="bg-emerald-700 text-white font-semibold px-4 py-2 rounded-xl hover:bg-emerald-600 transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer disabled:opacity-50"
                onClick={handlePayment}
                disabled={loading}
            >
                {loading ? "Processing..." : "Make Payment"}
            </button>
        </div>
    );
}
