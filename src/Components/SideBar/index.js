import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import styles from "../../Pages/ProductList/productlist.scss";
import useFetch from "../../Services/useFetch";
import useFetchByCall from "../../Services/useFetchByCall";

const SideBar = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [sliderValue, setSliderValue] = useState(0);
  const [data, setData] = useState(null);
  const {
    getResponse: categories,
    error: catErr,
    loading: catLoad,
  } = useFetch("/api/category");
  const {
    getResponse: brands,
    error: brandErr,
    loading: brandLoad,
  } = useFetch("/api/brand");
  // const { getDataByCall, getResponseCall, error: fetchError, loading: fetchLoading } = useFetchByCall();

  // useEffect(() => {
  //   getDataByCall(`/productsByCategory/${params.categoryName}/?${searchParams.toString()}`)
  // }, [params.categoryName, searchParams])

  const appendQueryParam = (key, value) => {
    searchParams.set(key, value);
    setSearchParams(searchParams);
    navigate(`/products/${params.categoryName}/?${searchParams.toString()}`);
  };

  const removeQueryParam = (key) => {
    searchParams.delete(key);
    setSearchParams(searchParams);
    navigate(`/products/${params.categoryName}/?${searchParams.toString()}`);
  };

  const handleClick = (item) => {
    let catName = item.replace(/\s+/g, "_");
    const url = `/products/${catName}`;
    navigate(url);
  };

  const handleSliderChange = (e) => {
    setSliderValue(e.target.value);
    appendQueryParam("price", e.target.value);
  };

  const [selectedBrands, setSelectedBrands] = useState([]);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      setSelectedBrands([...selectedBrands, value]);
    } else {
      setSelectedBrands(selectedBrands.filter((brand) => brand !== value));
    }
  };

  useEffect(() => {
    if (selectedBrands.length > 0) {
      appendQueryParam("brands", selectedBrands);
    } else {
      appendQueryParam("brands", "");
      removeQueryParam("brands");
    }
  }, [selectedBrands]);

  const [avilableValue, setAvilableValue] = useState("");

  const handleRadioChange = (event) => {
    setAvilableValue(event.target.value);
  };

  useEffect(() => {
    if (avilableValue) {
      appendQueryParam("isAvailable", avilableValue);
    }
  }, [avilableValue]);

  const sortOptions = [
    { name: "Price: Low to High", sort: "price", order: 1, current: false },
    { name: "Price: High to Low", sort: "price", order: 2, current: false },
    { name: "Newest First", sort: "createdAt", order: 3, current: false },
  ];

  const [sortBy, setSortBy] = useState("");
  const handleSort = (e, option) => {
    const sort = { _sort: option.sort, _order: option.order };
    console.log({ sort });
    setSortBy(option.order);
  };

  useEffect(() => {
    if (sortBy) {
      appendQueryParam("sort", sortBy);
    }
  }, [sortBy]);

  return (
    <>
      <h3>Filters</h3>

      <h5 className="mt-5">By Category</h5>
      <div className='categorySelector'>
        {categories?.map((category, i) => {
          return (
            <div key={i}>
              <div
                onClick={() => handleClick(category.name)}
                className="my-3 text-black fs-6 text_link">
                {category.name.toUpperCase()}
              </div>
            </div>
          );
        })}
      </div>

      <h5 className="mt-5">By Price</h5>
      <Form.Range
        value={sliderValue}
        name="priceRange"
        min="10000"
        max="100000"
        step="20"
        onChange={handleSliderChange}
      />
      <p>Selected Value: {sliderValue}</p>

      {/* <h5 className="mt-5">Sort By</h5> */}

      {sortOptions.map((option, i) => (
        <div key={i}>
          <label>
            <input
              type="radio"
              name="sortBy"
              onChange={(e) => handleSort(e, option)}
            /> &nbsp;
            {option.name}
          </label>
          <br />
        </div>
      ))}

      <h5 className="mt-5">By Brand</h5>
      <div className='categorySelector'>
        {brands?.map((brand, i) => {
          return (
            <div key={i}>
              <label>
                <input
                  type="checkbox"
                  value={brand.name}
                  onChange={handleCheckboxChange}
                />
                &nbsp; {brand.name}
              </label>
            </div>
          );
        })}
      </div>

      {/* <h5 className="mt-5">By Rating</h5> */}

      <h5 className="mt-5">By Availability</h5>
      <label>
        <input
          type="radio"
          name="option"
          value="all"
          checked={avilableValue === "all"}
          onChange={handleRadioChange}
        /> &nbsp;
        All
      </label>
      <br />
      <label>
        <input
          type="radio"
          name="option"
          value="available"
          checked={avilableValue === "available"}
          onChange={handleRadioChange}
        /> &nbsp;
        Available
      </label>
    </>
  );
};

export default React.memo(SideBar);
