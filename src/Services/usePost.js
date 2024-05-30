import { useState } from "react";
import { postAPI } from "../Services/apiRequests";

export default function usePost() {
  const [postResponse, setPostResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const createData = async (url, body) => {
    try {
      setLoading(true);
      const response = await postAPI(url, body);

      if (response) {
        setPostResponse(response);
      }
      setLoading(false);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { createData, postResponse, error, loading };
}
