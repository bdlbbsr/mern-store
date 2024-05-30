import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import styles from "../admin.module.css";
import { useNavigate} from "react-router-dom";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import useDelete from '../../Services/useDelete';
import useFetchByCall from '../../Services/useFetchByCall';
import useFetchSingle from '../../Services/useFetchSingle';
import usePatch from '../../Services/usePatch';
import usePost from '../../Services/usePost';
import useFetch from '../../Services/useFetch';

const api_base_URL = "http://localhost:8080/api";
const apiUrl = "/products";

const AddProduct = () => {
  const navigate = useNavigate();
  const [recordId, setRecordId] = useState(null);
  const [oprnForm, setOpenForm] = useState(false)
  const { getDataByCall, getResponseCall, error: fetchError, loading: fetchLoading } = useFetchByCall();
  const { createData, postResponse, error, loading } = usePost();
  const { patchData, getPatchResponse, error: patchError, loading: patchLoading } = usePatch();
  const { deleteData, getDeleteResponse, error: deleteError, loading: deleteLoading } = useDelete();
  const { getSingleData, getSingleResponse, error: fetchSingleErr, loading: fetchSingleLoad } = useFetchSingle();

  const { getResponse, error:catErr, loading:catLoad } = useFetch('/category');
  const { getResponse:brandList, error:brandErr, loading:brandLoad } = useFetch('/brand');

  const [inputs, setInputs] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    brand: '',
    stock: ''
  });
  const [thumbnail, setThumbnail] = useState(null);
  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const resetForm = () => {
    setInputs({
      name: '',
      price: '',
      description: '',
      category: '',
      brand: '',
      stock: '',
      thumbnail: '',
      images: ''
    });
  }

  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const handleImagesChange = (e) => {
    setImages([...e.target.files]);
  };

  const editItem = (id) => {
    setOpenForm(true)
    setRecordId(id);
    getSingleData(apiUrl, id)
  }

  useEffect(() => {
    if (getSingleResponse) {
      setInputs({
        name: getSingleResponse.name,
        price: getSingleResponse.price,
        description: getSingleResponse.description,
        category: getSingleResponse.category,
        brand: getSingleResponse.brand,
        stock: getSingleResponse.stock,
        thumbnail: getSingleResponse.thumbnail,
      });
    }
  }, [getSingleResponse]);



  const deleteItem = (id) => {
    deleteData(apiUrl, id)
  }

  useEffect(() => {
    getDataByCall(apiUrl)
  }, [getDeleteResponse, postResponse, getPatchResponse])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let thumbnailUrl = '';
      if (thumbnail) {
        const thumbnailFormData = new FormData();
        thumbnailFormData.append('file', thumbnail);
        const thumbnailResponse = await axios.post(`${api_base_URL}/upload`, thumbnailFormData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        thumbnailUrl = thumbnailResponse.data.url;
      }


      let imageUrls = [];
      if (images.length > 0) {
        const imageUploadPromises = images.map(image => {
          const imageFormData = new FormData();
          imageFormData.append('file', image);
          return axios.post('http://localhost:8080/api/upload', imageFormData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        });

        const imageResponses = await Promise.all(imageUploadPromises);
        imageUrls = imageResponses.map(response => response.data.url);
      }

      const productData = {
        ...inputs,
        thumbnail: thumbnailUrl,
        images: imageUrls,
      };

      if (recordId) {
        let url = apiUrl + '/' + recordId
        patchData(url, productData)
        resetForm();
        setOpenForm(false)
      } else {
        createData(apiUrl, productData)
        resetForm();
      }

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container className="containerWrapper">

      <Row>
        <Col className='text-end mb-5'>
        <button className='btn btn-dark me-5' onClick={() => navigate(-1)}> Back </button> 

          <Button variant="primary" onClick={() => oprnForm ? setOpenForm(false) : setOpenForm(true)}>
            {oprnForm ? 'Close form' : 'Add New Product'}
          </Button>
        </Col>
      </Row>

      {oprnForm &&
        <Form onSubmit={handleSubmit}>
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
              <option>Select Category</option>
              {getResponse && getResponse.map((item, i)=>(
                <option value={item.name} key={i}>{item.name}</option>
              ))}
              
               
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="brandSelect">
            <Form.Label>Brands</Form.Label>
            <Form.Select aria-label="Default select example" name="brand" value={inputs.brand} onChange={handleChange}>
              <option>Select Brand</option>
              {brandList && brandList.map((item, i)=>(
                <option value={item.name} key={i}>{item.name}</option>
              ))}
               
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Thumbnail Image</Form.Label>
            <Form.Control type="file" onChange={handleThumbnailChange} required />
          </Form.Group>

          <Form.Group controlId="formFileMultiple" className="mb-3">
            <Form.Label>Gallery Images</Form.Label>
            <Form.Control type="file" multiple onChange={handleImagesChange} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="stockInput">
            <Form.Label>Stock</Form.Label>
            <Form.Control type="text" placeholder=" " name="stock" value={inputs.stock} onChange={handleChange} />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>}


      <Row>
      <Col>Thumbnail</Col>
        <Col>Name</Col>
        <Col>Price</Col>
        <Col>Description</Col>
        <Col>Category</Col>
        <Col>Brand</Col>
        <Col>Stock</Col>
        <Col>Action</Col>
      </Row>

      {getResponseCall && getResponseCall.map((item, i) => (
        <Row key={i}>
          <Col><img src={`http://localhost:8080/${item.thumbnail}`} width={50} /></Col>
          <Col>{item.name}</Col>
          <Col>{item.price}</Col>
          <Col>{item.description}</Col>
          <Col>{item.category}</Col>
          <Col>{item.brand}</Col>
          <Col>{item.stock}</Col>
          
          <Col> <AiOutlineEdit size={30} onClick={() => editItem(item._id)} /> <AiOutlineDelete size={30} onClick={() => deleteItem(item._id)} /> </Col>
        </Row>
      ))}

    </Container>
  )

}

export default AddProduct;