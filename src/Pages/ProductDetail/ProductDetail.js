import React, { useEffect, useState } from "react";
import { Breadcrumb } from "react-bootstrap";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../Redux/features/Cart/CartSlice";
import {
  addToWishList,
  removeFromWishList,
} from "../../Redux/features/wishlist/WishListSlice";
import {
  useNavigate,
  useParams,
  useLocation,
  useMatch,
} from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../Components/Loader/Loader";
import useFetch from "../../Services/useFetch";
import styles from "./productdetail.scss";
import ProductSlider from "../../Components/Slider/ProductSlider";
import SimilarProducts from "../../Components/Slider/SimilarProducts";
import ErrorPage from "../ErrorPage/ErrorPage"
 

const ProductDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { id } = useParams();

  const dispatch = useDispatch();
  const productId = useSelector((state) => state.products.productId);

  useEffect(() => {
    if (productId?.id)
      if (productId?.name != params.productName) {
        navigate("/page-not-found");
      }
  }, [params.productName]);

  const state = useSelector((state) => state.wishlist.wishList).some(
    (p) => p?._id?.toString() === id
  );
  const {
    getResponse: data,
    error,
    loading,
    responseCode,
  } = useFetch(
    productId?.id
      ? `/api/products/${productId?.id}`
      : `/api/product/${params.productName}`
  );

  if (responseCode == "404") {
    navigate("/page-not-found");
  }

  if (!error && loading) {
    return <Loader />;
  }
  if (!loading && error) {
    return <h3>{error.message}</h3>;
  }

  //add product to cart handler
  const productHandler = () => {
    dispatch(addToCart(data));
    toast.success(`${data?.name.slice(0, 20)} is added to cart`, {
      autoClose: 1000,
    });
  };

  //Wishlist button handler
  const wishListHandler = () => {
    if (state) {
      dispatch(removeFromWishList(data));
      toast.warning(`${data?.name.slice(0, 20)} is remove from your wishlist`, {
        autoClose: 1000,
      });
    } else {
      dispatch(addToWishList(data));
      toast.success(`${data?.name.slice(0, 20)} is added to your wishlist`, {
        autoClose: 1000,
      });
    }
  };

  return (
    <Container className="containerWrapper">
      <Row>
        <Col>
          <Breadcrumb>
            <Breadcrumb.Item onClick={() => navigate("/")}>
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item active>{data?.name}</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>

      <Row>
        <Col
          xs={12}
          md={6}
          className='imageWrapper'>
          <ProductSlider data={data} />
        </Col>
        <Col
          xs={12}
          md={6}
          className="ps-5">
          <h4>{data?.name}</h4>
          <h6 className={data?.stock > 1 ? "text-success" : "text-danger"}>
            {data?.stock > 1 ? "In Stock" : "Out of Stock"}
          </h6>
          <h6>Category: {data?.category}</h6>
          <p className="py-1">{data?.description}</p>
          <h5>Price: ${data?.price}</h5>
          <button
            className="btn btn-primary mt-2"
            onClick={productHandler}>
            Add to Cart
          </button>
          <button
            className={`btn btn-primary mt-2 ms-2`}
            onClick={wishListHandler}>
            {state ? "Remove from Wishlist" : "Add to Wishlist"}
          </button>
        </Col>
      </Row>
      <Row>
        <Col className='productSliderWrapper'>
          <h4 className="py-2">Simlar Products</h4>
          <SimilarProducts category={data?.category} />
        </Col>
      </Row>
    </Container>
  );
};

export default React.memo(ProductDetail);
