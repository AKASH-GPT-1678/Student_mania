import axios from "axios";
import { ENV } from "../utils/ENV";

export const getAxios = async (url: string, token: string) => {
  try {
    // Create an axios instance with default headers
    const axiosInstance = axios.create({
      baseURL: ENV.BASE_URL, // optional: you can keep it fixed or dynamic
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Add your token here
      },
    });

    // Send the GET request
    const response = await axiosInstance.get(url);

    // Return the response data
    return response.data;

  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
};
