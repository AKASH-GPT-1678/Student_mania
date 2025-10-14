import axios from "axios";
import { ENV } from "../utils/ENV";
import { useAppSelector } from "../redux/reduxhooks";

import React from "react";

export const loadClass = async (token : string) => {
  try {

    const response = await axios.get(`${ENV.BASE_URL}/class/classes`, {
      headers: { Authorization: `Bearer ${token}` },
    });
        console.log(response.data);
    return response.data;

  } catch (error) {
    console.error("Error loading class:", error);
    return null; 
  }
};




const useFetch = <T>(fetchFunction: () => Promise<any>, autoFetch: boolean = true) => {
    const tokenn = useAppSelector((state) => state.user.token);

    const [data, setData] = React.useState<any | null>(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    const fetchData = async () => {

        try {
            setLoading(true);
            setError(null);
            setData(await fetchFunction());

        }
        catch (e) {
            // @ts-ignore
            setError(e instanceof Error ? e : new Error(e));
        }
        finally {
            setLoading(false);
        }

    };

    const refresh = () => {
        setData(null);
        setLoading(false);
        setError(null);

    };
    React.useEffect(() => {
        if (autoFetch) {
            fetchData();
        }
    }, []);
    return {
        data,
        loading,
        error,
        refresh: fetchData,
        reset: refresh,
    }


};


export default useFetch;