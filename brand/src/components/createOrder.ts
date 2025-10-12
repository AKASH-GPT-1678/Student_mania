import axios from "axios";

export async function createOrderId(amount: number) {
    const endpoint = import.meta.env.VITE_API_URL;
    try {
        const response = await axios.post(`${endpoint}/payment/create-order`, {
            amount: amount * 100, // Convert to paise
           
        });

        console.log("Order Response:", response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to create order");
    }
}