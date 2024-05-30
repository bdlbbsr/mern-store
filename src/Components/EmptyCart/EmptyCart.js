import React from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import cart from "../../assests/empty-cart.jpg";
import styles from "./emptycart.module.scss";

const EmptyCart = () => {
  const navigate = useNavigate();
  return (
    <Container className="containerWrapper">
      <div className={styles.emptyCart}>
        <img src={cart} alt="empty-cart-img" />
        <button className="btn btn-primary" onClick={() => navigate("/")}>
          Go Back to Add Some Products
        </button>
      </div>
    </Container>
  );
};

export default EmptyCart;
