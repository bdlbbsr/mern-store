import { useState, useEffect, useCallback } from "react";

const useWebWorker = (workerFunction, inputData) => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const memoizedWorkerFunction = useCallback(workerFunction, []);

  useEffect(() => {
    setLoading(true);
    setError(null);

    try {
      const code = memoizedWorkerFunction.toString();
      const blob = new Blob([`(${code})()`], {
        type: "application/javascript",
      });
      const workerScriptUrl = URL.createObjectURL(blob);
      const worker = new Worker(workerScriptUrl);

      worker.postMessage(inputData);
      worker.onmessage = (e) => {
        setResult(e.data);
        setLoading(false);
      };
      worker.onerror = (e) => {
        setError(e.messsage);
        setLoading(false);
      };

      return () => {
        worker.terminate();
        URL.revokeObjectURL(workerScriptUrl);
      };
    } catch (e) {
      setError(e.messsage);
      setLoading(false);
    }
  }, [inputData, memoizedWorkerFunction]);
  return { result, error, loading };
};

export default useWebWorker;