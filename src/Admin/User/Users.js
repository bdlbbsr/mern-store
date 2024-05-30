import Form from 'react-bootstrap/Form';
import { Container, Button } from "react-bootstrap";
import styles from "../admin.module.css";
import { useState, useEffect } from 'react';
import axios from 'axios'
import Loader from "../../Components/Loader/Loader";
import { getAPI, postAPI } from "../../Services/apiRequests"
import useFetch from '../../Services/useFetch'

const Users = () => {
  const [userData, setUserData] = useState(null)
  const [inputs, setInputs] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    stock: ''
  });




  const { getResponse, error, loading } = useFetch(`/users`);


  console.log("data", getResponse)

  if (!error && loading) {
    return <Loader />;
  }
  if (!loading && error) {
    return <h3>{error.message}</h3>;
  }



  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };


  // let getData = async (data) => {
  //   let res = await getAPI('/users', data)
  //   if (res.error) {
  //     console.log(res)
  //   } else {
  //     console.log("sucess", res)
  //     setUserData(res)
  //   }
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // getData(inputs)


  };


  return (
    <Container className="containerWrapper">
      {/* <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="NameInput">
          <Form.Label>Product Name</Form.Label>
          <Form.Control type="text" placeholder=" " name="name" value={inputs.name} onChange={handleChange} />

        </Form.Group>

        <Form.Group className="mb-3" controlId="priceInput">
          <Form.Label>Price</Form.Label>
          <Form.Control type="text" placeholder=" " name="price" value={inputs.price} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="descriptionInput">
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" placeholder=" " name="description" value={inputs.description} onChange={handleChange} />

        </Form.Group>
        <Form.Group className="mb-3" controlId="categorySelect">
          <Form.Label>Category</Form.Label>
          <Form.Select aria-label="Default select example" name="category" value={inputs.category} onChange={handleChange}>
            <option>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
        </Form.Group>

        

       
        <Form.Group className="mb-3" controlId="stockInput">
          <Form.Label>Stock</Form.Label>
          <Form.Control type="text" placeholder=" " name="stock" value={inputs.stock} onChange={handleChange} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form> */}
    </Container>
  )

}

export default Users;