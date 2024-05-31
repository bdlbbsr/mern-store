import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useLocation, useNavigate } from 'react-router-dom';
import useFetch from '../../Services/useFetch';
import styles from "./SearchPage.scss";
import Pagination from '../../Components/Pagination/Pagination';



const SearchPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [category, setCategory] = useState('');
  const [brands, setBrands] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [products, setProducts] = useState([]);
  const { getResponse: categories, error: catErr, loading: catLoad } = useFetch('/api/category');
  const { getResponse: brandslist, error: brandErr, loading: brandLoad } = useFetch('/api/brand');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState();



  useEffect(() => {
    handleSearch()
  }, [state, category, brands, minPrice, maxPrice, sortOrder, page, pageSize])

  const handleSearch = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/search?page=${page}&pageSize=${pageSize}`, {
        query: state,
        category,
        brand: brands.length > 0 ? brands : undefined,
        minPrice: minPrice ? parseFloat(minPrice) : undefined,
        maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
        sortField,
        sortOrder
      });
      setProducts(response.data.data);
      setTotalItems(response.data.totalItems)

    } catch (error) {
      console.error('Error searching for products:', error);
    }
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      setBrands([...brands, value]);
    } else {
      setBrands(brands.filter((brand) => brand !== value));
    }
  };

  const categoryClick = (item) => {
    setCategory(item)
  }

  const handleClick = (item) => {
    let names = item.name.replace(/\s+/g, '-');
    const url = `/${names}`
    navigate(url)
  }

  const handlePage = (page) => {
    
    setPage(page);
  };

 

  // useEffect(() => {
  //   const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
  //   dispatch(fetchProductsByFiltersAsync({ filter, sort, pagination }));
  // }, [dispatch, filter, sort, page]);

  // useEffect(() => {
  //   setPage(1);
  // }, [totalItems, sort]);




  return (
    <Container className="containerWrapper">
      <Row>
        <Col md={3} className="d-none d-md-block pb-5">
          <h5 className="mt-5">By Category</h5>
          <div className='categorySelector'>
            {categories?.map((category, i) => {
              return (
                <div key={i}>
                  <div
                    onClick={() => categoryClick(category.name)}
                    className="my-3 text-black fs-6 text_link">
                    {category.name.toUpperCase()}
                  </div>
                </div>
              );
            })}
          </div>

          <h5 className="mt-5">By Price</h5>


          <div>
            <label>
              <h6 className="mt-2">Min</h6>
              <select value={minPrice} onChange={(e) => setMinPrice(e.target.value)}>
                <option value="">Select field</option>
                <option value="5000">5000</option>
                <option value="10000">10000</option>
                <option value="15000">15000</option>
                <option value="20000">20000</option>
                
              </select>
            </label>
            <label>
              <h6 className="mt-2">Max:</h6>
              <select value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)}>
                <option value="">Select order</option>
                <option value="10000">10000</option>
                <option value="20000">20000</option>
                <option value="30000">30000</option>
                <option value="50000">50000</option>
                <option value="80000">80000</option>
                <option value="99000">99000</option>
                
              </select>
            </label>
          </div>

          <h5 className="mt-5">Sort By</h5>

          <div>
            <label>
              <h6 className="mt-2">By</h6>
              <select value={sortField} onChange={(e) => setSortField(e.target.value)}>
                <option value="">Select field</option>
                <option value="name">Name</option>
                <option value="price">Price</option>
                {/* Add more fields as needed */}
              </select>
            </label>
            <label>
              <h6 className="mt-2">Order:</h6>
              <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                <option value="">Select order</option>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </label>
          </div>

          <h5 className="mt-5">By Brand</h5>
          <div className='categorySelector'>
            {brandslist?.map((brand, i) => {
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



          <h5 className="mt-5">Products Per Page</h5>
          <label>
             
              <select value={minPrice} onChange={(e) => setPageSize(e.target.value)}>
                <option value="">Select field</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
              </select>
            </label>
        </Col>

        <Col xs={12} md={9}>
          <div>
          {products && products.map((product, i) => (
            <Row key={i} className='cartCard' onClick={() => handleClick(product)}>
              <Col md={3}>
                <img
                  src={`${process.env.REACT_APP_API_BASE_URL}/${product?.thumbnail}`}
                  alt="product-img"
                  style={{ maxWidth: "200px", maxHeight: "100px" }}
                  loading="lazy"
                />
              </Col>
              <Col md={4}>
                <h3>{product?.name}</h3>
                Brand - {product?.brand}<br />
                Category - {product?.category}
              </Col>
              <Col>
                <h2>$ {product?.price}</h2>
              </Col>
            </Row>
          ))
          }
          </div>
          
          <div>
          <Pagination
          page={page}
          pageSize={pageSize}
          setPage={setPage}
          handlePage={handlePage}
          totalItems={totalItems}
        ></Pagination>
          </div>
        </Col>
      </Row>
       
    </Container>

  );
};

export default SearchPage;
