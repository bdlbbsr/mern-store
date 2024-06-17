import React, { useLayoutEffect, useState } from "react";
import useFetchByCall from '../../Services/useFetchByCall';
import Loader from "../Loader/Loader";
import styles from "./slider.scss";
import ProductCard from "../ProductCard/ProductCard";

const SimilarProducts = ({ category }) => {
  const { getDataByCall, getResponseCall, error, loading } = useFetchByCall();
  const [categories, setCategories] = useState()
  // const [isMobile, setIsMobile] = useState(false);

  // //choose the screen size
  // const handleResize = () => {
  //   if (window.innerWidth <= 767) {
  //     setIsMobile(true);
  //   } else {
  //     setIsMobile(false);
  //   }
  // };

  // // create an event listener
  // useEffect(() => {
  //   window.addEventListener("resize", handleResize);
  // });

  let catName = category?.replace(/\s+/g, '_');
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // const [size, setSize] = useState("");
  // useLayoutEffect(() => {
  //   function updateSize() {
  //     setSize(window.innerWidth);
  //   }
  //   window.addEventListener("resize", updateSize);
  //   updateSize();
  //   return () => window.removeEventListener("resize", updateSize);
  // }, []);



  useLayoutEffect(() => {
    const fetchData = () => {

      delay(10) 
        .then(() => getDataByCall(`/api/productsByCategory/${catName}`))
        .then((result) => {
          setCategories(result);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    };

    fetchData();
  }, [catName]);

  if (!error && loading) {
    return <Loader />;
  }
  if (!loading && error) {
    return <h3>{error.message}</h3>;
  }

  return (
    <div className="container py-3">
       <div className='productList'>
              {getResponseCall && getResponseCall?.products.slice(0, 3)?.map((product) => {
                return <ProductCard key={product?._id} product={product} />;
              })}
            </div>
    </div>
  );
};

export default React.memo(SimilarProducts);
