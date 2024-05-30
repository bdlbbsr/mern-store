import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import ProductCard from "../../Components/ProductCard/ProductCard";
import SideBar from '../../Components/SideBar';
import useFetch from '../../Services/useFetch';
import useFetchByCall from '../../Services/useFetchByCall';
import styles from "./productlist.module.scss";



const ProductList = () => {
  const params = useParams()
  const [searchParams, setSearchParams] = useSearchParams();
  const { getDataByCall, getResponseCall, error: fetchError, loading: fetchLoading } = useFetchByCall();

  useEffect(() => {
    getDataByCall(`/productsByCategory/${params.categoryName}/?${searchParams.toString()}`)
  }, [params.categoryName, searchParams])

  return (
     
      <Container className="containerWrapper">
        <Row>
          <Col md={3} className="d-none d-md-block pb-5">
            <SideBar />
          </Col>
          <Col xs={12} md={9}>
            <div className={styles.searchWrapper}>
              <div>
                <h3>List of All Products</h3>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry standard dummy text ever since the 1500s.
                </p>
              </div>

            </div>

            <div className={styles.productList}>
              {getResponseCall?.map((product) => {
                return <ProductCard key={product?._id} product={product} />;
              })}
            </div>
          </Col>
        </Row>

      </Container>
     
  );
};

export default ProductList;
