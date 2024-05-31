import { useState } from "react";
import { getAPI } from "./apiRequests"

export default function useFetchByCall() {
  const [getResponseCall, setGetResponseCall] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getDataByCall = async (url) => {
    try {
      setLoading(true);
      const response = await getAPI(url);
      setGetResponseCall(response);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { getDataByCall, getResponseCall, error, loading };
}
