import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import notfound from "../../assests/notfound.jpg";

const ErrorPage = () => {
  return (
    <Container className="containerWrapper text-center">
      <img src={notfound} alt="Not found" />
    </Container>
  );
};

export default ErrorPage;
