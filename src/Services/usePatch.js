import { useState } from "react";
import { patchAPI } from "./apiRequests"

export default function usePatch() {
  const [getPatchResponse, setGetPatchResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const patchData = async (url, body) => {
    try {
      setLoading(true);
      const response = await patchAPI(url, body);
      setGetPatchResponse(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { patchData, getPatchResponse, error, loading };
}
