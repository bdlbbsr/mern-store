import { useEffect, useState } from 'react';
import { Button, Container, Row, Col } from "react-bootstrap";
import { useToggle } from '../../Services/useToggle';
import { useNavigate, useParams } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import usePost from '../../Services/usePost';
import useFetchByCall from '../../Services/useFetchByCall';
import useDelete from '../../Services/useDelete';
import usePatch from '../../Services/usePatch'
import useFetchSingle from '../../Services/useFetchSingle'
import styles from "../admin.module.css";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import * as Yup from 'yup';
import {useError, useSubmitError} from '../../Services/useError'
const apiUrl = '/category';

const validationSchema = Yup.object().shape({
  name: Yup.string().required("This is required")
});

const AddCategory = () => {
  const navigate = useNavigate();
  const [recordId, setRecordId] = useState(null);
  const [oprnForm, setOpenForm] = useState(false)
  const { getDataByCall, getResponseCall, error: fetchError, loading: fetchLoading } = useFetchByCall();
  const { createData, postResponse, error, loading } = usePost();
  const { patchData, getPatchResponse, error: patchError, loading: patchLoading } = usePatch();
  const { deleteData, getDeleteResponse, error: deleteError, loading: deleteLoading } = useDelete();
  const { getSingleData, getSingleResponse, error: fetchSingleErr, loading: fetchSingleLoad } = useFetchSingle();
  const { ValidateField, getErrorResponse } = useError();
  const [errors, setErrors] = useState({});
  const [inputs, setInputs] = useState({
    name: '',
    description: '',
  });


  const handleChange = async (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });

    ValidateField(name, value, validationSchema);
    
  };

  useEffect(() => {
    setErrors(getErrorResponse)
  }, [getErrorResponse]);

  const resetForm = () => {
    setInputs({
      name: '',
      description: ''
    });
  }

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

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(inputs, { abortEarly: false });
      if (recordId) {
       
        patchData(apiUrl + '/' + recordId, inputs)
        resetForm();
        setOpenForm(false)
      } else {
        createData(apiUrl, inputs)
        resetForm();
      }
    } catch (err) {
      const validationErrors = {};
      err.inner.forEach(error => {
        validationErrors[error.path] = error.message;
      });
      setErrors(validationErrors);
    }

  };

  

  const deleteItem = (id) => {
    deleteData(apiUrl, id)
  }

  useEffect(() => {
    getDataByCall(apiUrl)
  }, [getDeleteResponse, postResponse, getPatchResponse])





  return (
    <Container className="containerWrapper">
      <Row>
        <Col className='text-end mb-5'>
        <button className='btn btn-dark me-5' onClick={() => navigate(-1)}> Back </button> 
          <Button variant="primary" onClick={() => oprnForm ? setOpenForm(false) : setOpenForm(true)}>
            {oprnForm ? 'Close form' : 'Add New Category'}
          </Button>
        </Col>
      </Row>

      {oprnForm &&
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="NameInput">
            <Form.Label>Category Name</Form.Label>
            <Form.Control type="text" placeholder=" " name="name" value={inputs.name} onChange={handleChange} />
            {errors.name && <p className='formError'>{errors.name}</p>}
          </Form.Group>


          <Form.Group className="mb-3" controlId="descriptionInput">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" placeholder=" " name="description" value={inputs.description} onChange={handleChange} />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>}


      <Row>
        <Col>Name</Col>
        <Col>Description</Col>
        <Col>Action</Col>
      </Row>

      {getResponseCall && getResponseCall.map((item, i) => (
        <Row key={i}>
          <Col>{item.name}</Col>
          <Col>{item.description}</Col>
          <Col> <AiOutlineEdit size={30} onClick={() => editItem(item._id)} /> <AiOutlineDelete size={30} onClick={() => deleteItem(item._id)} /> </Col>
        </Row>
      ))}




    </Container>
  )

}

export default AddCategory;