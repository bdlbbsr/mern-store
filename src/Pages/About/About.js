import React, { useEffect, useMemo, useCallback  } from "react";
import { Container, Row } from "react-bootstrap";
import useFetchByCall from "../../Services/useFetchByCall";

const About = () => {
  const { getDataByCall, getResponseCall, error, loading } = useFetchByCall()
  const aboutUrl = '/api/about'
  const UI_Developer = 5;
  const Project_Manager = 9;
  const Frontend_Developer = 3;

  const myExp = (a, b, c) => {
  console.log("function called")
    return a+b+c

  }

const memoizedMyExp = useMemo(() => myExp(UI_Developer, Project_Manager, Frontend_Developer), [Frontend_Developer]);

const expensiveFunction = useCallback(() => {
  // Do something expensive here
  getDataByCall(aboutUrl)
}, [aboutUrl]);

  useEffect(()=>{
    expensiveFunction()
  },[])


  return (
     
      <Container className="containerWrapper">
        <Row>
          <h2 className="py-3 text-center">{getResponseCall?.title} <span className="fs-5">(Total IT Experience {memoizedMyExp} years)</span></h2>
          <p>
          {getResponseCall?.content}
          </p>
        </Row>
      </Container>
     
  );
};

export default About;
