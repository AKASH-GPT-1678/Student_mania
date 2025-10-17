import axios from "axios";
import { router } from "expo-router";
import { useDispatch } from "react-redux";

export const checkToken = async (token: string): Promise<boolean> => {
  if (!token) {
    console.warn("⚠️ No token found in Redux store");
    router.push("/signin");
    return false;
  }

  try {
    const res = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/api/auth/checktoken`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if(res.status != 200){
     
        
    }

    return res.status === 200;
  } catch (error: any) {
    console.error("❌ Token validation failed:", error.response?.data || error.message);
    router.push("/signin");
    return false;
  }
};
