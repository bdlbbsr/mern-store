import React, {
  useEffect,
  useMemo,
  useCallback,
  useState,
  useTransition,
} from "react";
import { Container, Row } from "react-bootstrap";
import useFetchByCall from "../../Services/useFetchByCall";
import useWebWorker from "../../Services/useWorkers";

const About = () => {
  const [isPending, startTransition] = useTransition();
  const [webResult, setWebResult] = useState();
  const {
    getDataByCall,
    getResponseCall,
    error: callRes,
    loading: Callload,
  } = useFetchByCall();
  const aboutUrl = "/api/about";

  const UI_Developer = 5;
  const Project_Manager = 9;
  const Frontend_Developer = 3;

  const myExp = (a, b, c) => {
    console.log("function called");
    return a + b + c;
  };

  const memoizedMyExp = useMemo(
    () => myExp(UI_Developer, Project_Manager, Frontend_Developer),
    [Frontend_Developer]
  );

  const expensiveFunction = useCallback(() => {
    // Do something expensive here
    getDataByCall(aboutUrl);
  }, [aboutUrl]);

  useEffect(() => {
    expensiveFunction();
  }, []);

  // api.js
  // export const getDataByCall = () => {
  //   return fetch("https://api.co/api/v2/endpoint").then((resp) => {
  //     if (resp.status === 200) return resp.json();
  //     else throw new Error("Invalid response");
  //   });
  // };

  // useEffect(() => {
  //   getDataByCall()
  //     .then((data) => setData(data))
  //     .catch((e) => setError(true));
  // }, []);

  function workerFunction() {
    this.onmessage = function (e) {
      let sum = 0;
      for (let i = 0; i < e.data; i++) {
        sum += i;
      }
      this.postMessage(sum);
    };
  }

  const { result, error, loading } = useWebWorker(workerFunction, 50000000);

  useEffect(() => {
    setWebResult(result);
  }, [result]);

  const fetchData = () => {
    // Perform the resource-intensive operation (e.g., fetching data from an API)
  };

  const handleButtonClick = () => {
    startTransition(() => {
      fetchData();
    });
  };

  //{isPending ? 'show loader' : show result data}

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  return (
    <Container className="containerWrapper">
      <Row>
        <h2 className="py-3 text-center">
          {getResponseCall?.title}{" "}
          <span className="fs-5">
            (Total IT Experience {memoizedMyExp} years)
          </span>
        </h2>
        <p>Web Worker Result: {webResult}</p>
        <p>{getResponseCall?.content}</p>
      </Row>
    </Container>
  );
};

export default About;
