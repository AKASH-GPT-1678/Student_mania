import { useAppSelector } from "../redux/reduxhooks";
import { useGetAxios } from "./getaxios";
import { router } from "expo-router";


export const checkToken = async (token : string) => {
  

    if (!token) {
        console.warn("⚠️ No token found in Redux store");
        router.push('/signin');
        return false;
    };

    try {

        const { data, error, loading } = useGetAxios(`api/auth/check-token`);


        if (data.status === 200) {
            return true;
        } else {
            return false;
        }
    } catch (error: any) {
        console.error("❌ Token validation failed:", error.response?.data || error.message);
        return false;
    }
};
