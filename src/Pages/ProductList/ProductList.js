import React, { useEffect, useState, useCallback } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import ProductCard from "../../Components/ProductCard/ProductCard";
import SideBar from "../../Components/SideBar";
import useFetch from "../../Services/useFetch";
import useFetchByCall from "../../Services/useFetchByCall";
import styles from "./productlist.scss";
import axios from "axios";

const ProductList = () => {
  const [items, setItems] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [index, setIndex] = useState(2);

  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    getDataByCall,
    getResponseCall,
    error: fetchError,
    loading: fetchLoading,
  } = useFetchByCall();

  useEffect(() => {
    getDataByCall(
      `/api/productsByCategory/${
        params.categoryName
      }/?${searchParams.toString()}`
    );
  }, [params.categoryName, searchParams]);

  const fetchData = useCallback(async () => {
    if (isLoading) return;

    setIsLoading(true);

    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/api/productsByCategory/${
          params.categoryName
        }/?${searchParams.toString()}&page=${index}&pageSize=${10}`
      )
      .then((res) => {
        setItems((prevItems) => [...prevItems, ...res.data.products]);
      })
      .catch((err) => console.log(err));
    setIndex((prevIndex) => prevIndex + 1);

    setIsLoading(false);
  }, [index, isLoading]);

  const getData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/productsByCategory/${
          params.categoryName
        }/?${searchParams.toString()}&page=${1}&pageSize=${10}`
      );
      console.log("load", response.data.products);
      setItems(response.data.products);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, [params.categoryName, searchParams]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 20) {
        fetchData();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [fetchData]);

  return (
    <Container className="containerWrapper">
      <Row>
        <Col
          md={3}
          className="d-none d-md-block pb-5">
          <SideBar />
        </Col>
        <Col
          xs={12}
          md={9}>
          <div className="searchWrapper">
            <div>
              <h3>List of All Products</h3>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry standard dummy text ever since the 1500s.
              </p>
            </div>
          </div>

          <div className="productList">
            {items?.map((product) => {
              return (
                <ProductCard
                  key={product?._id}
                  product={product}
                />
              );
            })}
            {isLoading && <p>Loading...</p>}
            {/* {isLoading && <Loader />} */}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductList;
