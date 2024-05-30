import { useEffect, useState } from "react";
import { getAPI } from "../Services/apiRequests"

export default function useFetch(url) {
  const [getResponse, setGetResponse] = useState(null);
  const [responseCode, setResponseCode] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const response = await getAPI(url);
        //const data = await response.json()
        setGetResponse(response.data);
        response.error && setResponseCode(response?.message?.response?.status)
      } catch (err) {
         
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [url]);

  return { getResponse, error, loading, responseCode };
}
