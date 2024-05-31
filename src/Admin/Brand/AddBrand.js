import axios from 'axios';
import { useState, useEffect } from 'react';
import { Button, Col, Container, Row } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { postAPI } from "../../Services/apiRequests"
import useDelete from '../../Services/useDelete';
import useFetchByCall from '../../Services/useFetchByCall';
import useFetchSingle from '../../Services/useFetchSingle';
import usePatch from '../../Services/usePatch';
import usePost from '../../Services/usePost';
import styles from "../admin.module.css";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { useNavigate} from "react-router-dom";
const apiUrl = "/api/brand";



const AddBrand = () => {
  const navigate = useNavigate();
  const [recordId, setRecordId] = useState(null);
  const [oprnForm, setOpenForm] = useState(false)
  const { getDataByCall, getResponseCall, error: fetchError, loading: fetchLoading } = useFetchByCall();
  const { createData, postResponse, error, loading } = usePost();
  const { patchData, getPatchResponse, error: patchError, loading: patchLoading } = usePatch();
  const { deleteData, getDeleteResponse, error: deleteError, loading: deleteLoading } = useDelete();
  const { getSingleData, getSingleResponse, error: fetchSingleErr, loading: fetchSingleLoad } = useFetchSingle();

  const [inputs, setInputs] = useState({
    name: '',
    description: ''
  });
  const [thumbnail, setThumbnail] = useState(null);

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
      description: '',
      logo:''
    });
  }

  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0]);
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
        description: getSingleResponse.description,
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
        const thumbnailResponse = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/upload`, thumbnailFormData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        thumbnailUrl = thumbnailResponse.data.url;
      }



      const brandData = {
        ...inputs,
        logo: thumbnailUrl
      };


      if (recordId) {
        let url = apiUrl + '/' + recordId
        patchData(url, brandData)
        resetForm();
        setOpenForm(false)
      } else {
        createData(apiUrl, brandData)
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
            {oprnForm ? 'Close form' : 'Add New Brand'}
          </Button>
        </Col>
      </Row>

      {oprnForm && <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="NameInput">
          <Form.Label>Brand Name</Form.Label>
          <Form.Control type="text" placeholder=" " name="name" value={inputs.name} onChange={handleChange} />

        </Form.Group>

        <Form.Group className="mb-3" controlId="descriptionInput">
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" placeholder=" " name="description" value={inputs.description} onChange={handleChange} />

        </Form.Group>


        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Brand Logo</Form.Label>
          <Form.Control type="file" onChange={handleThumbnailChange} required />
        </Form.Group>


        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form> }

      <Row>
        <Col>Name</Col>
        <Col>Description</Col>
        <Col>Logo</Col>
        <Col>Action</Col>
      </Row>

      {getResponseCall && getResponseCall?.data.map((item, i) => (
        <Row key={i}>
          <Col>{item.name}</Col>
          <Col>{item.description}</Col>
          <Col><img src={`${process.env.REACT_APP_API_BASE_URL}/${item.logo}`} width={50}/></Col>
          <Col> <AiOutlineEdit size={30} onClick={() => editItem(item._id)} /> <AiOutlineDelete size={30} onClick={() => deleteItem(item._id)} /> </Col>
        </Row>
      ))}

    </Container>
  )

}

export default AddBrand;