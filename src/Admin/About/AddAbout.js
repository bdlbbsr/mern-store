import { useState, useEffect } from 'react';
import { Button, Container } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { patchAPI } from "../../Services/apiRequests";
import styles from "../admin.module.css";
import useFetch from '../../Services/useFetch'
import usePatch from '../../Services/usePatch'
const apiUrl = '/about'

const AddAbout = () => {
  const { getResponse, error:aboutErr, loading:aboutload } = useFetch(apiUrl);
  const { patchData, getPatchResponse, error, loading } = usePatch();
  const [inputs, setInputs] = useState({
    title: '',
    content: ''
     
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    patchData(apiUrl, inputs)
  };
 


  return (
    <Container className="containerWrapper">
    
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="NameInput">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder=" " name="title" value={inputs.title} onChange={handleChange} />

        </Form.Group>

        <Form.Group className="mb-3" controlId="priceInput">
          <Form.Label>Content</Form.Label>
          <Form.Control type="text" placeholder=" " name="content" value={inputs.content} onChange={handleChange} />
        </Form.Group>

        

        <Button variant="primary" type="submit">
          Update About
        </Button>
      </Form>



<div>
<p>{getResponse?.title}</p>
  <p>{getResponse?.content}</p>
</div>


    </Container>
  )

}

export default AddAbout;