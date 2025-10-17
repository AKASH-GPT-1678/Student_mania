import axios from "axios";
import { ENV } from "./ENV";
import { useAppSelector } from "../redux/reduxhooks";
import React from "react";

export const useGetAxios = (apiUrl: string) => {
  const token = useAppSelector((state) => state.user.token);

  const [data, setData] = React.useState<any>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`${ENV.BASE_URL}/${apiUrl}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        setData(response.data);
      } catch (err: any) {
        console.error("❌ Axios request failed:", err.response?.data || err.message);
        setError(err.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchData();
  }, [apiUrl, token]);

  return { data, error, loading };
};
