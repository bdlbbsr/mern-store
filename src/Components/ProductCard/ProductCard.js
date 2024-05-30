import React, { memo } from "react";
import { Button, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../Redux/features/Cart/CartSlice";
import { setProductId } from "../../Redux/features/Product/ProductSlice"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import styles from "./productCard.module.scss";

const api_base_URL='https://mern-store-backend-sigma.vercel.app/';

const ProductCard = ({ product }) => {
  const title = product?.name.slice(0, 20);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cart);

  const navigate = useNavigate();

  //add product to cart handler
  const addProduct = () => {
    dispatch(addToCart(product));
    toast.success(`${product?.name.slice(0, 20)} is added to cart`, {
      autoClose: 1000,
    });
  };

  const handleClick = (item) => {
    let names = item.name.replace(/\s+/g, '-');
    const url = `/${names}`
    dispatch(setProductId({ id: item._id, name: names }))
    navigate(url)
  }



  return (
     
      <Card
        style={{ width: "18rem", textAlign: "center" }}
        className={styles.productCard}
      >
        <Card.Img
          // onClick={() => navigate(`/${product?._id}`)}
          onClick={() => handleClick(product)}
          variant="top"
          src={`${api_base_URL}${product?.thumbnail}`}
          className={styles.cardImg}
        />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>${product?.price}</Card.Text>
          <Button variant="outline-success" onClick={addProduct}>
            ADD TO CART
          </Button>
        </Card.Body>
      </Card>
    
  );
};

export default memo(ProductCard);
