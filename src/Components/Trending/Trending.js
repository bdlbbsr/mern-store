import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { STATUS } from "../../constants/Status";
import { fetchProducts } from "../../Redux/features/Product/ProductSlice";
import {
  setCategory,
  setSearchProduct,
} from "../../Redux/features/ProductFilter/FilterSlice";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./trending.scss";
import Loader from "../Loader/Loader";

import { BiSearch } from "react-icons/bi";

const Trending = () => {
  const [showSearch, setShowSearch] = useState(false);

  const dispatch = useDispatch();

  const { products, status } = useSelector((state) => state.products);
  const { searchedProduct, category } = useSelector(
    (state) => state.productFilter
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  let productsData;

  const categories = [
    {
      value: "all",
      name: "Find Product By Category",
    },
    {
      value: "Jewellery",
      name: "Jewellery",
    },
    {
      value: "electronics",
      name: "Electronics",
    },
    {
      value: "Men's Cloth",
      name: "Men's Clothing",
    },
    {
      value: "Women's Cloth",
      name: "Women's Clothing",
    },
    {
      value: "Kid's Cloth",
      name: "Kid's Clothing",
    },
  ];

  if (searchedProduct) {
    productsData = products?.filter((item) =>
      item.name.toLowerCase().includes(searchedProduct.toLowerCase())
    );
  } else if (category.length > 0) {
    if (category.toLowerCase() === "all") {
      productsData = products;
    } else {
      productsData = products?.filter((item) =>
        item.category.toLowerCase().includes(category.toLowerCase())
      );
    }
  } else {
    productsData = products;
  }

  if (status === STATUS.LOADING) {
    return <Loader />;
  }

  if (status !== STATUS.LOADING && status === STATUS.ERROR) {
    return <h2>{status}</h2>;
  }

  return (
    
      <Container className="containerWrapper">
        <div className='searchWrapper'>
          <div>
            <h3>Trending Products</h3>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry standard dummy text ever since the 1500s.
            </p>
          </div>
          <div>
            {showSearch && (
              <input
                type="text"
                className='searchBar'
                value={searchedProduct}
                onChange={(e) => dispatch(setSearchProduct(e.target.value))}
                placeholder="Search Product"
              />
            )}
            <BiSearch
              size={25}
              onClick={() => setShowSearch(!showSearch)}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
        <div className='categorySelector'>
          <select
            className="form-select"
            aria-label="Default select example"
            defaultValue={category}
            onChange={(e) => dispatch(setCategory(e.target.value))}
          >
            {categories.map((option) => (
              <option value={option.value} key={option.value}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        <div className='productList'>
          {productsData?.slice(0, 8).map((product) => {
            return <ProductCard key={product?._id} product={product} />;
          })}
        </div>
      </Container>
     
  );
};

export default Trending;
