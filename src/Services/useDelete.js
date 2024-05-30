import { useState } from "react";
import { deleteAPI } from "./apiRequests"

export default function useDelete() {
  const [getDeleteResponse, setGetDeleteResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const deleteData = async (url, id) => {
    try {
      setLoading(true);
      const response = await deleteAPI(url, id);
      setGetDeleteResponse(response);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { deleteData, getDeleteResponse, error, loading };
}
