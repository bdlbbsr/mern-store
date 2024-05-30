import { useEffect, useState } from "react";
import { getSingleAPI } from "./apiRequests"

export default function useFetchSingle() {
  const [getSingleResponse, setGetSingleResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getSingleData = async (url, id) => {
    try {
      setLoading(true);
      const response = await getSingleAPI(url, id);
      setGetSingleResponse(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  return { getSingleData, getSingleResponse, error, loading };
}
